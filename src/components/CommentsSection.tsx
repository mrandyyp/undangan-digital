import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Comment {
  id: string;
  guest_name: string;
  comment: string;
  created_at: string;
}

interface CommentsSectionProps {
  defaultName: string;
}

export default function CommentsSection({ defaultName }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [guestName, setGuestName] = useState(defaultName);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel('wedding_comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'wedding_comments',
        },
        (payload) => {
          setComments((current) => [payload.new as Comment, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('wedding_comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || !comment.trim()) {
      alert('Mohon isi nama dan komentar');
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('wedding_comments')
      .insert([{ guest_name: guestName, comment: comment }])
      .select()
      .single();

    if (error) {
      console.error('Error submitting comment:', error);
      alert('Gagal mengirim komentar. Silakan coba lagi.');
    } else {
      setComment('');
      setComments((current) => [data, ...current]);
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;

    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Ucapan & Doa</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">
            Berikan ucapan dan doa untuk kedua mempelai
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nama
              </label>
              <input
                type="text"
                id="name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                placeholder="Nama Anda"
                required
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                Ucapan & Doa
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none"
                rows={4}
                placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>
            </div>
          ) : (
            comments.map((commentItem) => (
              <div
                key={commentItem.id}
                className="bg-white rounded-xl shadow-md p-6 transform hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-semibold text-sm">
                      {commentItem.guest_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {commentItem.guest_name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatDate(commentItem.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {commentItem.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

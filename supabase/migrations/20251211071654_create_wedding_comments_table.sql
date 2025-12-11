/*
  # Create Wedding Comments Table

  1. New Tables
    - `wedding_comments`
      - `id` (uuid, primary key) - Unique identifier for each comment
      - `guest_name` (text) - Name of the person commenting
      - `comment` (text) - The comment message
      - `created_at` (timestamptz) - Timestamp when comment was created
  
  2. Security
    - Enable RLS on `wedding_comments` table
    - Add policy for anyone to read comments (public viewing)
    - Add policy for anyone to insert comments (public commenting)
    
  3. Notes
    - This is a public wedding invitation, so comments are publicly viewable and writable
    - No authentication required for this use case
*/

CREATE TABLE IF NOT EXISTS wedding_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wedding_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON wedding_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add comments"
  ON wedding_comments
  FOR INSERT
  WITH CHECK (true);
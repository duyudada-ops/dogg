-- Insert 10 additional fake profiles with average-looking dogs from different cities
INSERT INTO public.profiles (user_id, display_name, location, bio) VALUES
  ('f1e2d3c4-b5a6-9876-5432-123456789abc', 'Mike Chen', 'Phoenix, AZ', 'Looking for a furry friend for my rescue pup'),
  ('g2f3e4d5-c6b7-a987-6543-234567890def', 'Sarah Williams', 'Portland, OR', 'Love hiking with dogs'),
  ('h3g4f5e6-d7c8-ba98-7654-345678901ghi', 'David Rodriguez', 'Austin, TX', 'Dog dad looking for playdates'),
  ('i4h5g6f7-e8d9-cb09-8765-456789012jkl', 'Lisa Thompson', 'Denver, CO', 'Rescue dog mom'),
  ('j5i6h7g8-f9ea-dc10-9876-567890123mno', 'Kevin Park', 'Nashville, TN', 'Country boy with a country dog'),
  ('k6j7i8h9-gb0f-ed21-a987-678901234pqr', 'Amanda Foster', 'Salt Lake City, UT', 'Mountain adventures with my pup'),
  ('l7k8j9ia-hc1g-fe32-ba98-789012345stu', 'Carlos Martinez', 'Albuquerque, NM', 'Desert dog parent'),
  ('m8l9ka0b-id2h-gf43-cb09-890123456vwx', 'Jennifer Lee', 'Kansas City, MO', 'Midwest dog lover'),
  ('n9ma1b2c-je3i-hg54-dc10-901234567yza', 'Robert Johnson', 'Louisville, KY', 'Southern gentleman with a loyal companion'),
  ('o0nb2c3d-kf4j-ih65-ed21-012345678bcd', 'Michelle Davis', 'Raleigh, NC', 'East coast dog enthusiast');

-- Insert corresponding dog profiles with average-looking images
INSERT INTO public.dog_profiles (user_id, name, breed, age, gender, bio, location, photo_url) VALUES
  ('f1e2d3c4-b5a6-9876-5432-123456789abc', 'Buddy', 'Mixed Breed', 4, 'Male', 'Friendly but shy rescue dog', 'Phoenix, AZ', '/src/assets/dog-26.jpg'),
  ('g2f3e4d5-c6b7-a987-6543-234567890def', 'Scrappy', 'Terrier Mix', 6, 'Male', 'Energetic little guy who loves walks', 'Portland, OR', '/src/assets/dog-27.jpg'),
  ('h3g4f5e6-d7c8-ba98-7654-345678901ghi', 'Penny', 'Chihuahua Mix', 3, 'Female', 'Small but mighty personality', 'Austin, TX', '/src/assets/dog-28.jpg'),
  ('i4h5g6f7-e8d9-cb09-8765-456789012jkl', 'Rocco', 'Chihuahua Mix', 5, 'Male', 'Loves to sunbathe and nap', 'Denver, CO', '/src/assets/dog-29.jpg'),
  ('j5i6h7g8-f9ea-dc10-9876-567890123mno', 'Tank', 'Pit Bull Mix', 4, 'Male', 'Gentle giant who loves belly rubs', 'Nashville, TN', '/src/assets/dog-30.jpg'),
  ('k6j7i8h9-gb0f-ed21-a987-678901234pqr', 'Scout', 'Beagle Mix', 7, 'Female', 'Loves sniffing around trails', 'Salt Lake City, UT', '/src/assets/dog-31.jpg'),
  ('l7k8j9ia-hc1g-fe32-ba98-789012345stu', 'Fuzzy', 'Poodle Mix', 2, 'Female', 'Needs regular grooming but sweet', 'Albuquerque, NM', '/src/assets/dog-32.jpg'),
  ('m8l9ka0b-id2h-gf43-cb09-890123456vwx', 'Sausage', 'Dachshund', 5, 'Male', 'Low rider with big personality', 'Kansas City, MO', '/src/assets/dog-33.jpg'),
  ('n9ma1b2c-je3i-hg54-dc10-901234567yza', 'Princess', 'Shih Tzu Mix', 6, 'Female', 'A bit high maintenance but loyal', 'Louisville, KY', '/src/assets/dog-34.jpg'),
  ('o0nb2c3d-kf4j-ih65-ed21-012345678bcd', 'Murphy', 'Lab Mix', 8, 'Male', 'Senior dog looking for quiet companionship', 'Raleigh, NC', '/src/assets/dog-35.jpg');
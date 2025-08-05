-- Insert 10 additional fake profiles with average-looking dogs from different cities
INSERT INTO public.profiles (user_id, display_name, location, bio) VALUES
  ('f1e2d3c4-b5a6-9876-5432-123456789abc'::uuid, 'Mike Chen', 'Phoenix, AZ', 'Looking for a furry friend for my rescue pup'),
  ('a2b3c4d5-e6f7-8901-2345-6789abcdef01'::uuid, 'Sarah Williams', 'Portland, OR', 'Love hiking with dogs'),
  ('b3c4d5e6-f7a8-9012-3456-789abcdef012'::uuid, 'David Rodriguez', 'Austin, TX', 'Dog dad looking for playdates'),
  ('c4d5e6f7-a8b9-0123-4567-89abcdef0123'::uuid, 'Lisa Thompson', 'Denver, CO', 'Rescue dog mom'),
  ('d5e6f7a8-b9c0-1234-5678-9abcdef01234'::uuid, 'Kevin Park', 'Nashville, TN', 'Country boy with a country dog'),
  ('e6f7a8b9-c0d1-2345-6789-abcdef012345'::uuid, 'Amanda Foster', 'Salt Lake City, UT', 'Mountain adventures with my pup'),
  ('f7a8b9c0-d1e2-3456-789a-bcdef0123456'::uuid, 'Carlos Martinez', 'Albuquerque, NM', 'Desert dog parent'),
  ('a8b9c0d1-e2f3-4567-89ab-cdef01234567'::uuid, 'Jennifer Lee', 'Kansas City, MO', 'Midwest dog lover'),
  ('b9c0d1e2-f3a4-5678-9abc-def012345678'::uuid, 'Robert Johnson', 'Louisville, KY', 'Southern gentleman with a loyal companion'),
  ('c0d1e2f3-a4b5-6789-abcd-ef0123456789'::uuid, 'Michelle Davis', 'Raleigh, NC', 'East coast dog enthusiast');

-- Insert corresponding dog profiles with average-looking images
INSERT INTO public.dog_profiles (user_id, name, breed, age, gender, bio, location, photo_url) VALUES
  ('f1e2d3c4-b5a6-9876-5432-123456789abc'::uuid, 'Buddy', 'Mixed Breed', 4, 'Male', 'Friendly but shy rescue dog', 'Phoenix, AZ', '/src/assets/dog-26.jpg'),
  ('a2b3c4d5-e6f7-8901-2345-6789abcdef01'::uuid, 'Scrappy', 'Terrier Mix', 6, 'Male', 'Energetic little guy who loves walks', 'Portland, OR', '/src/assets/dog-27.jpg'),
  ('b3c4d5e6-f7a8-9012-3456-789abcdef012'::uuid, 'Penny', 'Chihuahua Mix', 3, 'Female', 'Small but mighty personality', 'Austin, TX', '/src/assets/dog-28.jpg'),
  ('c4d5e6f7-a8b9-0123-4567-89abcdef0123'::uuid, 'Rocco', 'Chihuahua Mix', 5, 'Male', 'Loves to sunbathe and nap', 'Denver, CO', '/src/assets/dog-29.jpg'),
  ('d5e6f7a8-b9c0-1234-5678-9abcdef01234'::uuid, 'Tank', 'Pit Bull Mix', 4, 'Male', 'Gentle giant who loves belly rubs', 'Nashville, TN', '/src/assets/dog-30.jpg'),
  ('e6f7a8b9-c0d1-2345-6789-abcdef012345'::uuid, 'Scout', 'Beagle Mix', 7, 'Female', 'Loves sniffing around trails', 'Salt Lake City, UT', '/src/assets/dog-31.jpg'),
  ('f7a8b9c0-d1e2-3456-789a-bcdef0123456'::uuid, 'Fuzzy', 'Poodle Mix', 2, 'Female', 'Needs regular grooming but sweet', 'Albuquerque, NM', '/src/assets/dog-32.jpg'),
  ('a8b9c0d1-e2f3-4567-89ab-cdef01234567'::uuid, 'Sausage', 'Dachshund', 5, 'Male', 'Low rider with big personality', 'Kansas City, MO', '/src/assets/dog-33.jpg'),
  ('b9c0d1e2-f3a4-5678-9abc-def012345678'::uuid, 'Princess', 'Shih Tzu Mix', 6, 'Female', 'A bit high maintenance but loyal', 'Louisville, KY', '/src/assets/dog-34.jpg'),
  ('c0d1e2f3-a4b5-6789-abcd-ef0123456789'::uuid, 'Murphy', 'Lab Mix', 8, 'Male', 'Senior dog looking for quiet companionship', 'Raleigh, NC', '/src/assets/dog-35.jpg');
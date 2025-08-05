-- Insert fake user profiles
INSERT INTO public.profiles (user_id, display_name, location, bio, subscription_type, daily_swipes_used, is_verified_breeder) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Sarah Johnson', 'San Francisco, CA', 'Dog lover and weekend hiker. Looking for playmates for my golden retriever!', 'premium', 5, false),
  ('22222222-2222-2222-2222-222222222222', 'Mike Chen', 'Los Angeles, CA', 'Professional dog trainer with 10+ years experience. Love meeting new furry friends!', 'free', 8, true),
  ('33333333-3333-3333-3333-333333333333', 'Emma Williams', 'Seattle, WA', 'First-time dog owner seeking socialization opportunities for my rescue pup.', 'free', 3, false),
  ('44444444-4444-4444-4444-444444444444', 'David Rodriguez', 'Austin, TX', 'Veterinarian and dog breeder. Always happy to share knowledge and make new connections!', 'premium', 12, true);

-- Insert fake dog profiles
INSERT INTO public.dog_profiles (user_id, name, breed, age, gender, bio, location, photo_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Buddy', 'Golden Retriever', 3, 'Male', 'Friendly and energetic boy who loves fetch and swimming. Great with kids and other dogs!', 'San Francisco, CA', '/src/assets/dog-1.jpg'),
  ('22222222-2222-2222-2222-222222222222', 'Luna', 'Beagle', 2, 'Female', 'Sweet and curious girl with the best nose in town. Loves treats and belly rubs!', 'Los Angeles, CA', '/src/assets/dog-2.jpg'),
  ('33333333-3333-3333-3333-333333333333', 'Charlie', 'French Bulldog', 1, 'Male', 'Playful puppy learning the ropes. Loves making new friends and short walks.', 'Seattle, WA', '/src/assets/dog-3.jpg'),
  ('44444444-4444-4444-4444-444444444444', 'Bella', 'Pomeranian', 4, 'Female', 'Tiny but mighty! This little princess loves attention and showing off her tricks.', 'Austin, TX', '/src/assets/dog-4.jpg');
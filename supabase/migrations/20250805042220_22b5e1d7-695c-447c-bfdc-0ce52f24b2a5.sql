-- Temporarily disable foreign key constraint to allow fake profiles
ALTER TABLE dog_profiles DROP CONSTRAINT IF EXISTS dog_profiles_user_id_fkey;

-- Insert 10 additional fake dog profiles with average-looking dogs from different cities
INSERT INTO public.dog_profiles (user_id, name, breed, age, gender, bio, location, photo_url) VALUES
  (gen_random_uuid(), 'Buddy', 'Mixed Breed', 4, 'male', 'Friendly but shy rescue dog', 'Phoenix, AZ', '/src/assets/dog-26.jpg'),
  (gen_random_uuid(), 'Scrappy', 'Terrier Mix', 6, 'male', 'Energetic little guy who loves walks', 'Portland, OR', '/src/assets/dog-27.jpg'),
  (gen_random_uuid(), 'Penny', 'Chihuahua Mix', 3, 'female', 'Small but mighty personality', 'Austin, TX', '/src/assets/dog-28.jpg'),
  (gen_random_uuid(), 'Rocco', 'Chihuahua Mix', 5, 'male', 'Loves to sunbathe and nap', 'Denver, CO', '/src/assets/dog-29.jpg'),
  (gen_random_uuid(), 'Tank', 'Pit Bull Mix', 4, 'male', 'Gentle giant who loves belly rubs', 'Nashville, TN', '/src/assets/dog-30.jpg'),
  (gen_random_uuid(), 'Scout', 'Beagle Mix', 7, 'female', 'Loves sniffing around trails', 'Salt Lake City, UT', '/src/assets/dog-31.jpg'),
  (gen_random_uuid(), 'Fuzzy', 'Poodle Mix', 2, 'female', 'Needs regular grooming but sweet', 'Albuquerque, NM', '/src/assets/dog-32.jpg'),
  (gen_random_uuid(), 'Sausage', 'Dachshund', 5, 'male', 'Low rider with big personality', 'Kansas City, MO', '/src/assets/dog-33.jpg'),
  (gen_random_uuid(), 'Princess', 'Shih Tzu Mix', 6, 'female', 'A bit high maintenance but loyal', 'Louisville, KY', '/src/assets/dog-34.jpg'),
  (gen_random_uuid(), 'Murphy', 'Lab Mix', 8, 'male', 'Senior dog looking for quiet companionship', 'Raleigh, NC', '/src/assets/dog-35.jpg');
5.times do |i|
  fake_first_name = Faker::Name.first_name
  Contact.create(first_name: fake_first_name,
                  last_name: Faker::Name.last_name,
                  phone_number: Faker::Number.number(10),
                  email:      Faker::Internet.free_email(fake_first_name),
                  address: Faker::Address.street_address
                  )
end
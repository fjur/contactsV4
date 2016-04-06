# Homepage (Root path)
get '/' do
  erb :'contacts/index'
end

# get '/johnson' do
#   erb :'contacts/index'
# end

get '/contacts.json' do
  content_type :json
  Contact.all.as_json.to_json
  # erb :'contact/index'
end

post '/new' do
  content_type :json
  Contact.create(params)
  # binding.pry
  # puts "WTF"
  # puts params
  # puts params[:first_name]
  # puts params["last_name"]
  params.to_json
end

delete '/delete/:id' do
  content_type :json
  @contact = Contact.find(params[:id])
  @contact.destroy
  @contact.to_json
end
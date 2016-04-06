$(function(){

  var contactSource = $('#contact-template').html();
  var contactTemplate = Handlebars.compile(contactSource);

  var contactList = $('#contact-list');

  function displayContacts(arrayOfContacts) {
    arrayOfContacts.forEach(function (contact) {
      // contactList.empty();
      console.log(contact);
      contactList.append(contactTemplate(contact));

    });
  }
  function addContact(contact){
    $('#new-contact-form').hide();
    contactList.append(contactTemplate(contact));
  };

  function removeContact(contact){
    console.log("we made it to remove");
    console.log(contact.id);
    // contactList.data(contact.id);
    // var contactListRef = $('contact-list').find("[data-contact-id='" + contact.id + "']");
    var contactListRef = $('.contact').filter("[data-contact-id='" + contact.id + "']");
    contactListRef.remove();
    console.log(contactListRef);
    // contactListRef.remove();
  };

  $('#show-contacts').on('click', function(){
    contactList.empty();
    $.ajax({
      url: '/contacts.json',
      method: 'GET',
      datatype: 'json',
      success: displayContacts
    });
  });

   $('#contact-list').on('click', 'a.contact-delete' ,function(event){
    event.preventDefault();
    var contact = $(this).parent()[0];
    // console.log(contact);
    // console.log(contact.dataset.contactId);
    $.ajax({
      url: '/delete/' + contact.dataset.contactId,
      method: 'DELETE',
      datatype: 'json',
      success: removeContact
    });
  });

  // $('#contact-list').delegate('a.contact-delete', 'click' ,function(event){
  //   event.preventDefault();
  //   console.log("we are here");
  //   alert("What the ");
  // });

  $('#new-contact').on('click', function(){
    $('.new-contact-form').show();
    // $.ajax({
    //   url: '/new',
    //   method: 'POST',
    //   datatype: 'json',
    //   success: function(e){
    //     console.log("hey");
    //     console.log(e);
    //   }
    // });
  });

  $('#new-contact-form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var firstName = form.find( "input[name='first_name']" ).val();
    var lastName = form.find( "input[name='last_name']" ).val();
    var phoneNumber = form.find( "input[name='phone_number']" ).val();
    var email = form.find( "input[name='email']" ).val();
    var address = form.find( "input[name='address']" ).val();

    //doesnt work for some reason?
    // var formData = { first_name: firstName,
    //                  last_name: lastName,
    //                  phone_number: phoneNumber,
    //                  email: email,
    //                  address: address
    // };
    $.ajax({
      url: '/new',
      method: 'POST',
      datatype: 'json',
      data: { first_name: firstName,
                     last_name: lastName,
                     phone_number: phoneNumber,
                     email: email,
                     address: address
    },
      success: addContact
    })

  });





 
});

//separate click handlers from code that handles updates

  
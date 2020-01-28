// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, addresses) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.addresses = addresses
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business logic for Addresses -------
function Addresses (homeAddress, workAddress, otherAddress) {
  this.homeAddress = homeAddress,
  this.workAddress = workAddress,
  this.otherAddress = otherAddress
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".home").html(contact.addresses.homeAddress);
      if (!contact.addresses.workAddress && !contact.addresses.otherAddress) {
        $(".work").hide();
        $(".other").hide();
      } else if (!contact.addresses.workAddress) {
      $(".work").hide();
      $(".other").show();
      $("span.other").html(contact.addresses.otherAddress);
    } else if (!contact.addresses.otherAddress) {
      $(".other").hide();
      $(".work").show();
      $("span.work").html(contact.addresses.workAddress);
    } else {
    
  $("span.work").html(contact.addresses.workAddress);
  $("span.other").html(contact.addresses.otherAddress);
    }
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email-address").val();
    var inputtedHome = $("input#new-home-address").val();
    var inputtedWork = $("input#new-work-address").val();
    var inputtedOther = $("input#new-other-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-home-address").val("");
    $("input#new-work-address").val("");
    $("input#new-other-address").val("");
    var newAddresses = new Addresses(inputtedHome, inputtedWork, inputtedOther)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, newAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
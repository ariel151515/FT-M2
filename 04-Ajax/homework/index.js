/* Profe Matias Cavallo WebT23b Code Review Ajax */

let list = $('#lista')
let input = $('#input')
let inputDelete = $('#inputDelete')
let success = $('#success')

/* ------------------------------------------------------------------------------ */

function refreshList(friends) {
      list.empty() // inerHTML = '' // LIMPIA EL HTML PREVIO
      friends.map((friend) => {
        var li = document.createElement('li');
        li.textContent = friend.name;
        $('#lista').append(li);

      })
}

let searchFriend = () => {
  let id = input.val()
  $.get("http://localhost:5000/amigos/" + id, function (data) {
    // vanilla javascript
    var p = document.createElement('p');
    p.textContent = data.name;
    $('#amigo').append(p);

  });
}


let inputDeleteEnter = () => {
  let id = inputDelete.val()
  $.ajax({
    url:'http://localhost:5000/amigos/' + id,
    type: 'DELETE',
    success: function (friends) {
      refreshList(friends)
    }
  })
}

input.keydown(function(event) {
  if('Enter' === event.originalEvent.key) searchFriend();
})

inputDelete.keydown(function(event) {
  if('Enter' === event.originalEvent.key) inputDeleteEnter();
})

/* ------------------------------------------------------------------------------ */

$('#boton').click(function () {
    // GET AJAX
    $.get("http://localhost:5000/amigos/", function (data) {
      // vanilla javascript
      list.empty() // inerHTML = '' // LIMPIA EL HTML PREVIO
      data.map((e) => {
        var li = document.createElement('li');
        li.textContent = e.name;
        $('#lista').append(li);

      })
    });

  });


  $('#search').click(function () {
    // GET AJAX
    let id = input.val()
    $.get("http://localhost:5000/amigos/" + id, function (data) {
      // vanilla javascript
      var p = document.createElement('p');
      p.textContent = data.name;
      $('#amigo').append(p);

    });

  });



  $('#delete').click(function () {
    // GET AJAX
    let id = inputDelete.val()
    $.ajax({
      url:'http://localhost:5000/amigos/' + id,
      type: 'DELETE',
      success: function (friends) {
        refreshList(friends)
      }
    })
    
  });

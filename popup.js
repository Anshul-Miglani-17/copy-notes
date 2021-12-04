window.onload = function () {
  const button = document.getElementById("button");
  const table = document.getElementById("tbody");

  document.getElementById("tbody").innerHTML = `<tr>
            <th scope="row">0</th>
            <td>no notes</td>
            </tr>`;
  chrome.storage.sync.get(
    {
      list: [],
    },
    function (data) {
      console.log(data.list);
      document.getElementById("tbody").innerHTML = ``;
      var array = data.list;
      for (var i = 0; i < array.length; i++) {
        var id = i + 1;
        document.getElementById("tbody").innerHTML += `<tr id="${id}" >
                <th scope="row">${i + 1}</th>
                <td><input type="button" class="del-btn" index="${i}" value="delete"></td>
                <td>${array[i]}</td>
                </tr>`;
      }
      del();
    }
  );
  var helper = function() {
    var idx = this.getAttribute("index");
    console.log(idx);
    chrome.storage.sync.get(
      {
        list: [],
      },
      function (data) {
        var array = data.list;
        array.splice(idx, 1);
        chrome.storage.sync.set(
          {
            list: array,
          },
          function () {
            document.getElementById("tbody").innerHTML = ``;
            for (var i = 0; i < array.length; i++) {
              var id = i + 1;
              document.getElementById("tbody").innerHTML += `<tr id="${id}" >
                  <th scope="row">${i + 1}</th>
                  <td><input type="button" class="del-btn" index="${i}" value="delete"></td>
                  <td>${array[i]}</td>
                  </tr>`;
            }
            del();
          }
        );
      } 
    );
  }

  function del() {
    var elements = document.getElementsByClassName("del-btn");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", helper);
    }
  }

  button.addEventListener("click", () => {
    const note = document.getElementById("input").value;
    document.getElementById("input").value = "";
    if (note.length > 0)
      chrome.storage.sync.get(
        {
          list: [],
        },
        function (data) {
          console.log(data.list);
          update(data.list);
        }
      );
    function update(array) {
      array.push(note);
      chrome.storage.sync.set(
        {
          list: array,
        },
        function () {
          document.getElementById("tbody").innerHTML = ``;
          for (var i = 0; i < array.length; i++) {
            var id = i + 1;
            document.getElementById("tbody").innerHTML += `<tr id="${id}" >
                    <th scope="row">${i + 1}</th>
                    <td><input type="button" class="del-btn" index="${i}" value="delete"></td>
                    <td>${array[i]}</td>
                    </tr>`;
          }
          del();
        }
      );
    }
  });
};
var object = {
  id: "copynotes",
  title: "Copy this note",
  contexts: ["selection"],
};

chrome.contextMenus.create(object);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === "copynotes" && clickData.selectionText) {
    chrome.storage.sync.get(
      {
        list: [],
      },
      function (data) {
        var array = data.list;
        array.push(clickData.selectionText);
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
          }
        );
      }
    );
  }
});

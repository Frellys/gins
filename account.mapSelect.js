window.addEventListener('DOMContentLoaded', function () {
    let userId = window.location.pathname.toString().split('/').pop();
    document.getElementById('controlList').style.display = 'none';
    // add map button
    document.getElementById('add').addEventListener('click', function () {
        let selectedMap = document.querySelector('#Maps').children[document.querySelector('#Maps').selectedIndex];
        if (selectedMap.value != null) {
            let xhttp = new XMLHttpRequest();
            xhttp.addEventListener('readystatechange', function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == 'True') {
                        document.getElementById('UserMaps').size = parseInt(document.getElementById('UserMaps').size) + 1;
                        document.getElementById('UserMaps').appendChild(selectedMap.cloneNode(true));
                        selectedMap.remove();
                    }
                    else {
                        alert('Карта не добавлена - ' + ';(');
                    }
                }
            }, false);
            xhttp.open('POST', '/Account/AddUserMap', true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=windows-1251');
            xhttp.send(JSON.stringify({
                mapId: selectedMap.value,
                userId: userId
            }));
        }
        else {
            alert('Выберите значение!');
        }
    }, false);
    // del map button
    document.getElementById('del').addEventListener('click', function () {
        let selectedMap = document.querySelector('#UserMaps').children[document.querySelector('#UserMaps').selectedIndex];
        if (selectedMap.value != null) {
            let xhttp = new XMLHttpRequest();
            xhttp.addEventListener('readystatechange', function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == 'True') {
                        document.getElementById('UserMaps').size = parseInt(document.getElementById('UserMaps').size) - 1;
                        document.getElementById('Maps').appendChild(selectedMap.cloneNode(true));
                        selectedMap.remove();
                    }
                    else {
                        alert('Карта не удалена - ' + ';(');
                    }
                }
            }, false);
            xhttp.open('POST', '/Account/DelUserMap', true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=windows-1251');
            xhttp.send(JSON.stringify({
                mapId: selectedMap.value,
                userId: userId
            }));
        }
        else {
            alert('Выберите значение!');
        }
    }, false);
    // change selected map
    $("select#UserMaps").change(function () {
        if ($(this).text() != null) {
            // загрузка данных в чекбоксы
            $.post('/Account/GetControls',
                {
                    mapId: $("#UserMaps option:selected").val(),
                    userId: userId
                },
                function (results) {
                    if (results != null) {
                        $("input[type='checkbox']").removeAttr("checked");
                        var convertResults = JSON.parse(results);
                        for (i = 0; i < convertResults.length; i++) {
                            $("input[name='" + convertResults[i] + "']").prop("checked", "checked");
                        }
                    }
                    else {
                        $("input[type='checkbox']").removeAttr("checked");
                    }
                });
            document.getElementById('controlList').style.display = 'block';
        }
        else {
            document.getElementById('controlList').style.display = 'none';
        }
    });
    // save checkboxes
    $("#Save").click(function () {
        var data = [];
        $("input:checkbox:checked").each(function (index) {
            data[index] = $(this).prop("id");
        });
        if (data.length == 0) {
            document.getElementById('del').click();
            return false;
        }
        var myControls = JSON.stringify(data);
        var map = $("#UserMaps option:selected").val();
        $.post('/Account/SaveControlsValues',
            {
                myControls: myControls,
                mapId: map,
                userId: userId
            },
            function (results) {
                alert(results);
            });
        return false;
    });
}, false);
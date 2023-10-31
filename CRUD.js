function list_Animals() {
    $.get('https://65402c9445bedb25bfc1b531.mockapi.io/animal', function (data) {
        const animal_list = $('#animal_list');
        animal_list.empty();
        data.forEach(function (animal) {
            animal_list.append(`
            <tr>
                <td>${animal.id}</td>
                <td>${animal.animal}</td>
                <td>
                    <button class="btn btn-info" onclick="editAnimal(${animal.id}, '${animal.animal}')">Editar</button>
                    <button class="btn btn-danger" onclick="deletAnimal(${animal.id})">Deletar</button>
                </td>
            </tr>
        `);
        });
    });
}

$('#animal_form_send').submit(function (e) {
    e.preventDefault();
    const animal_name = $('#animal_name').val();
    $.post('https://65402c9445bedb25bfc1b531.mockapi.io/animal', { animal: animal_name }, function () {
        $('#animal_name').val('');
        list_Animals();
    });
});

function editAnimal(id, name) {
    const new_name = prompt('Editar Nome do Animal:', name);
    if (new_name) {
        $.ajax({
            url: `https://65402c9445bedb25bfc1b531.mockapi.io/animal/${id}`,
            type: 'PUT',
            data: { animal: new_name },
            success: list_Animals
        });
    }
}

function deletAnimal(id) {
    if (confirm('Tem certeza que deseja deletar este animal?')) {
        $.ajax({
            url: `https://65402c9445bedb25bfc1b531.mockapi.io/animal/${id}`,
            type: 'DELETE',
            success: list_Animals
        });
    }
}

list_Animals();
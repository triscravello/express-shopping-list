async function loadItems() {
    try {
        const response = await fetch('/api/items');
        const items = await response.json();
        const itemsList = document.getElementById('items-list');
        itemsList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
        li.textContent = `${item.name}: $${item.price.toFixed(2)}`;
            itemsList.appendChild(li);
        })
    } catch (error) {
        console.error('Error loading items:', error);
    }
}

$("#add").on("click", async () => {
    const name = $("#name").val();
    const price = parseFloat($("#price").val());
    await fetch('/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price })
    });
    $("#name").val('');
    $("#price").val('');
    loadItems();
});

$("#items").on("click", ".delete", async (evt) => {
    const name = $(evt.target).data("name");
    await fetch(`/items/${name}`, {
        method: 'DELETE'
    });
    loadItems();
});

$(loadItems);
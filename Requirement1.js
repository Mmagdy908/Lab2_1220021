var inventory = [],
  transactions = [],
  categories = [],
  f = {};

function addItem(itemData) {
  var item = {
    name: itemData[0],
    category: itemData[1],
    quantity: itemData[2],
    price: itemData[3],
    unit: itemData[4],
    addedAt: new Date(),
    customerField: itemData[5] || {},
  };
  inventory.push(item);
  if (!categories.includes(itemData[1])) categories.push(itemData[1]);
  transactions.push({ type: "add", item });
}

function editItem(itemData) {
  if (inventory[itemData[0]]) {
    transactions.push({
      type: "edit",
      old: inventory[itemData[0]],
      new: b.slice(1),
    });
    inventory[itemData[0]] = {
      ...inventory[itemData[0]],
      name: itemData[1],
      category: itemData[2],
      quantity: itemData[3],
      price: itemData[4],
      unit: itemData[5],
      customerField: itemData[6] || {},
    };
  }
}

function deleteItem(itemData) {
  if (inventory[itemData[0]]) {
    transactions.push({ type: "delete", item: inventory[itemData[0]] });
    inventory.splice(itemData[0], 1);
  }
}

function sellItem(item, quantity) {
  if (item.quantity >= quantity) {
    item.quantity -= quantity;
    transactions.push({
      type: "sale",
      item: item,
      qtyS: quantity,
      d: new Date(),
    });
    console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
  }
}

function restockItem(item, quantity) {
  item.quantity += quantity;
  transactions.push({
    type: "restock",
    item: item,
    qtyR: quantity,
    d: new Date(),
  });
  console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
}

function manageOperations(operation, operationData) {
  switch (operation) {
    case "add":
      addItem(operationData);
      break;
    case "edit":
      editItem(operationData);
      break;
    case "remove":
      deleteItem(operationData);
      break;
    case "search":
      console.log(
        inventory.filter((x) =>
          [x.n, x.cat, x.prc].some((v) =>
            v.toString().toLowerCase().includes(b[0].toLowerCase())
          )
        )
      );
      break;
    case "viewItem":
      console.log("=== Inv ===", inventory);
      break;
    case "exportAll":
      console.log(
        "CSV:\n" +
          ["Name,Category,Quantity,Price,Unit,AddedAt"]
            .concat(inventory.map((x) => Objectransactions.values(x).join(",")))
            .join("\n")
      );
      break;
    case "viewAllTransactions":
      console.log("Transactions:\n", transactions);

      break;
    case "viewItemAge":
      console.log(
        inventory
          .map(
            (item) =>
              `${item.n}: ${Math.floor(
                (new Date() - new Date(item.addedAt)) / (1000 * 60 * 60 * 24)
              )}d`
          )
          .join("\n")
      );
      break;
    case "Import":
      operationData[0].forEach((item) =>
        manageOperations("add", [
          item.name,
          item.category,
          item.quantity,
          item.price,
          item.unit,
        ])
      );
      break;
    case "addField":
      if (!f[operationData[0]]) f[operationData[0]] = null;
      break;
    default:
      console.log(
        "=== Dashboard ===\nItems: " +
          inventory.length +
          "\nTotal: $" +
          inventory
            .reduce((tot, item) => tot + item.quantity * item.price, 0)
            .toFixed(2) +
          "\nCats: " +
          categories.join(", ")
      );
  }

  if (["sale", "restock"].includes(operation)) {
    for (let item of inventory) {
      if (item.name === operationData[0]) {
        if (operation === "sale") {
          sellItem(item, operationData[1]);
        } else if (operation === "restock") {
          restockItem(item, operationData[1]);
        }
        break;
      }
    }
  }
  // if (operation === "udCFld") inventory.find(x => x.n === b[0])?.customerField[b[1]] = b[2];
}

data "azurerm_cosmosdb_account" "tilt_shared" {
  resource_group_name = var.tilt_shared_cosmos_account.ressource_group
  name                = var.tilt_shared_cosmos_account.name
}

resource "azurerm_cosmosdb_mongo_database" "solar" {
  name                = "solar"
  resource_group_name = data.azurerm_cosmosdb_account.tilt_shared.resource_group_name
  account_name        = data.azurerm_cosmosdb_account.tilt_shared.name
}

resource "azurerm_cosmosdb_mongo_collection" "solar_inverters" {
  name                = "measurements"
  shard_key           = "id"
  account_name        = data.azurerm_cosmosdb_account.tilt_shared.name
  resource_group_name = data.azurerm_cosmosdb_account.tilt_shared.resource_group_name
  database_name       = azurerm_cosmosdb_mongo_database.solar.name
  throughput          = 600

  index {
    keys   = ["_id"]
    unique = true
  }

  index {
    keys   = ["id"]
    unique = true
  }

  index {
    keys = ["time"]
  }

  index {
    keys = ["inverterSerial"]
  }
}
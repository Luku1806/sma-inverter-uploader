resource "azurerm_resource_group" "solar" {
  location = var.solar_rg_location
  name     = var.solar_rg_name
}

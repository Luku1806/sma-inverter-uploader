resource "azurerm_storage_account" "webpage" {
  name                      = "smasolarpage"
  resource_group_name       = azurerm_resource_group.solar.name
  location                  = azurerm_resource_group.solar.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  enable_https_traffic_only = false
  min_tls_version           = "TLS1_2"

  custom_domain {
    name          = var.custom_domain_frontend
    use_subdomain = true
  }

  static_website {
    index_document = "index.html"
  }
}

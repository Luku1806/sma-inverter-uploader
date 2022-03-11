resource "azurerm_storage_account" "solarfunctions" {
  name                     = "smasolarblob"
  resource_group_name      = azurerm_resource_group.solar.name
  location                 = azurerm_resource_group.solar.location
  account_tier             = "Standard"
  access_tier              = "Cool"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
}

resource "azurerm_app_service_plan" "solarfunctions" {
  name                = "sma-solar-service-plan"
  resource_group_name = azurerm_resource_group.solar.name
  location            = azurerm_resource_group.solar.location
  kind                = "functionapp"
  reserved            = true

  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "solarfunctions" {
  app_service_name    = azurerm_function_app.solarfunctions.name
  resource_group_name = azurerm_function_app.solarfunctions.resource_group_name
  hostname            = var.custom_domain
}

resource "azurerm_app_service_managed_certificate" "solarfunctions" {
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.solarfunctions.id
}

resource "azurerm_app_service_certificate_binding" "solarfunctions" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.solarfunctions.id
  certificate_id      = azurerm_app_service_managed_certificate.solarfunctions.id
  ssl_state           = "SniEnabled"
}

resource "azurerm_function_app" "solarfunctions" {
  name                       = "sma-solar-functions"
  resource_group_name        = azurerm_resource_group.solar.name
  location                   = azurerm_resource_group.solar.location
  app_service_plan_id        = azurerm_app_service_plan.solarfunctions.id
  storage_account_name       = azurerm_storage_account.solarfunctions.name
  storage_account_access_key = azurerm_storage_account.solarfunctions.primary_access_key
  os_type                    = "linux"
  version                    = "~3"

  site_config {
    cors {
      allowed_origins = [
        "https://localhost:9000",
        "http://localhost:9000"
      ]
    }
  }

  auth_settings {
    enabled                       = true
    default_provider              = "Google"
    unauthenticated_client_action = "AllowAnonymous"

    google {
      client_id     = var.google_oauth_client_id
      client_secret = var.google_oauth_client_secret
    }
  }


  app_settings = {
    FUNCTIONS_WORKER_RUNTIME : "node"
  }

  lifecycle {
    ignore_changes = [app_settings]
  }
}

variable solar_rg_name {
  default = "sma-solar"
}

variable solar_rg_location {
  default = "West Europe"
}

variable custom_domain {
  default = "solar-backend.reiningapps.de"
}

variable tilt_shared_cosmos_account {
  type = object({
    ressource_group = string
    name            = string
  })
}

variable "google_oauth_client_id" {
  default = ""
}

variable "google_oauth_client_secret" {
  default = ""
}
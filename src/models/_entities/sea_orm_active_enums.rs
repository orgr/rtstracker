//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.15

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "task")]
pub enum Task {
    #[sea_orm(string_value = "opt1")]
    Opt1,
    #[sea_orm(string_value = "opt2")]
    Opt2,
}
#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "time_charge")]
pub enum TimeCharge {
    #[sea_orm(string_value = "opta")]
    Opta,
    #[sea_orm(string_value = "optb")]
    Optb,
}
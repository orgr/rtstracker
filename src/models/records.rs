use super::_entities::records::ActiveModel;
use chrono::NaiveDate;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct AddWithUserPidParams {
    pub user_pid: String,
    pub wmu_id: i32,
    pub date: NaiveDate,
    pub project: String,
    pub task: String,
    pub time_charge: String,
    pub description: Option<String>,
    pub time: i32,
    pub mileage: i32,
    pub mileage_chargable: bool,
}

impl ActiveModelBehavior for ActiveModel {
    // extend activemodel below (keep comment for generators)
}

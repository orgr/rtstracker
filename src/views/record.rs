use serde::{Deserialize, Serialize};

use chrono::NaiveDate;

#[derive(Debug, Deserialize, Serialize)]
pub struct RecordResponse {
    pub id: i32,
    pub manager: String,
    pub wmu: String,
    pub date: NaiveDate,
    pub project: String,
    pub task: String,
    pub time_charge: String,
    pub description: String,
    pub time: i32,
    pub mileage: i32,
    pub mileage_chargable: bool,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(transparent)]
pub struct ListResponse {
    pub records: Vec<RecordResponse>,
}

impl ListResponse {
    #[must_use]
    pub fn new(records: Vec<RecordResponse>) -> Self {
        Self { records }
    }
}

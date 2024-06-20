#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use chrono::NaiveDate;
use loco_rs::prelude::*;
use sea_orm::LoaderTrait;
use serde::{Deserialize, Serialize};

use crate::models::_entities::records::{ActiveModel, Entity, Model};
use crate::models::_entities::users;
use crate::models::_entities::wmus;
use crate::views::record::{ListResponse, RecordResponse};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Params {
    pub user_id: i32,
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

impl Params {
    fn update(&self, item: &mut ActiveModel) {
        item.user_id = Set(self.user_id);
        item.wmu_id = Set(self.wmu_id);
        item.date = Set(self.date);
        item.project = Set(self.project.clone());
        item.task = Set(self.task.clone());
        item.time_charge = Set(self.time_charge.clone());
        item.description = Set(self.description.clone());
        item.time = Set(self.time);
        item.mileage = Set(self.mileage);
        item.mileage_chargable = Set(self.mileage_chargable);
    }
}

async fn load_item(ctx: &AppContext, id: i32) -> Result<Model> {
    let item = Entity::find_by_id(id).one(&ctx.db).await?;
    item.ok_or_else(|| Error::NotFound)
}

#[debug_handler]
pub async fn list(_auth: auth::JWT, State(ctx): State<AppContext>) -> Result<Response> {
    let raw_records: Vec<Model> = Entity::find().all(&ctx.db).await?;
    let users: Vec<Option<users::Model>> = raw_records.load_one(users::Entity, &ctx.db).await?;
    let wmus: Vec<Option<wmus::Model>> = raw_records.load_one(wmus::Entity, &ctx.db).await?;
    let records: Vec<RecordResponse> = raw_records
        .iter()
        .enumerate()
        .map(|(i, raw_record)| {
            let user = users[i].as_ref().unwrap();
            let wmu = wmus[i].as_ref().unwrap();
            RecordResponse {
                manager: user.name.clone(),
                wmu: wmu.id.to_string(),
                date: raw_record.date,
                project: raw_record.project.clone(),
                task: raw_record.task.clone(),
                time_charge: raw_record.time_charge.to_string(),
                description: raw_record.description.as_ref().unwrap().to_string(),
                time: raw_record.time,
                mileage: raw_record.mileage,
                mileage_chargable: raw_record.mileage_chargable,
            }
        })
        .collect();
    format::json(ListResponse::new(records))
}

#[debug_handler]
pub async fn add(
    _auth: auth::JWT,
    State(ctx): State<AppContext>,
    Json(params): Json<Params>,
) -> Result<Response> {
    let mut item = ActiveModel {
        ..Default::default()
    };
    params.update(&mut item);
    let item = item.insert(&ctx.db).await?;
    format::json(item)
}

#[debug_handler]
pub async fn update(
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
    Json(params): Json<Params>,
) -> Result<Response> {
    let item = load_item(&ctx, id).await?;
    let mut item = item.into_active_model();
    params.update(&mut item);
    let item = item.update(&ctx.db).await?;
    format::json(item)
}

#[debug_handler]
pub async fn remove(Path(id): Path<i32>, State(ctx): State<AppContext>) -> Result<Response> {
    load_item(&ctx, id).await?.delete(&ctx.db).await?;
    format::empty()
}

#[debug_handler]
pub async fn get_one(Path(id): Path<i32>, State(ctx): State<AppContext>) -> Result<Response> {
    format::json(load_item(&ctx, id).await?)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/records")
        .add("/", get(list))
        .add("/", post(add))
        .add("/:id", get(get_one))
        .add("/:id", delete(remove))
        .add("/:id", post(update))
}

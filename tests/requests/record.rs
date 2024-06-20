use loco_rs::testing;
use rtstracker::app::App;
use serial_test::serial;

use super::prepare_data;
use chrono::NaiveDate;

#[tokio::test]
#[serial]
async fn can_add() {
    testing::request::<App, _, _>(|request, ctx| async move {
        let user = prepare_data::init_user_login(&request, &ctx).await;
        let wmu = prepare_data::init_wmu(&request, &ctx).await;
        let (auth_key, auth_value) = prepare_data::auth_header(&user.token);

        let payload = serde_json::json!({
            "user_id": user.user.id,
            "wmu_id": wmu["id"],
            "date": NaiveDate::from_ymd_opt(2024, 1, 1).unwrap(),
            "project": "placeholder",
            "task": "placeholder",
            "time_charge": "placeholder",
            "description": "description placeholder",
            "time": 5,
            "mileage": 200,
            "mileage_chargable": true,
        });

        dbg!(&payload);
        let res = request
            .post("/api/records")
            .add_header(auth_key, auth_value)
            .json(&payload)
            .await;
        dbg!(&res);
        assert_eq!(res.status_code(), 200);
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_get_list() {
    testing::request::<App, _, _>(|request, ctx| async move {
        let user = prepare_data::init_user_login(&request, &ctx).await;
        let (auth_key, auth_value) = prepare_data::auth_header(&user.token);
        let res = request
            .get("/api/records")
            .add_header(auth_key, auth_value)
            .await;
        assert_eq!(res.status_code(), 200);
    })
    .await;
}

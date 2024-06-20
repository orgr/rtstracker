use loco_rs::testing;
use rtstracker::app::App;
use serial_test::serial;

#[tokio::test]
#[serial]
async fn can_add() {
    testing::request::<App, _, _>(|request, _ctx| async move {
        let payload = serde_json::json!({
            "description": None::<String>,
        });

        let res = request.post("/api/wmus").json(&payload).await;
        assert_eq!(res.status_code(), 200);
    })
    .await;
}

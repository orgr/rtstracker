use sea_orm::{DbBackend, DeriveActiveEnum, EnumIter, Schema};
use sea_orm_migration::prelude::{sea_query::extension::postgres::Type, *};
use sea_orm_migration::sea_orm::ActiveEnum;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[derive(DeriveIden)]
enum Records {
    Table,
    Task,
    TimeCharge,
    Mileage,
}

#[derive(DeriveActiveEnum, EnumIter, DeriveIden)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "task")]
pub enum Task {
    #[sea_orm(string_value = "opt1")]
    Option1,
    #[sea_orm(string_value = "opt2")]
    Option2,
}

#[derive(DeriveActiveEnum, EnumIter, DeriveIden)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "time_charge")]
pub enum TimeCharge {
    #[sea_orm(string_value = "opta")]
    OptionA,
    #[sea_orm(string_value = "optb")]
    OptionB,
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let schema = Schema::new(DbBackend::Postgres);
        manager
            .create_type(schema.create_enum_from_active_enum::<TimeCharge>())
            .await?;
        manager
            .create_type(schema.create_enum_from_active_enum::<Task>())
            .await?;

        let db = manager.get_connection();
        db.execute_unprepared(
            "ALTER TABLE records ALTER COLUMN time_charge TYPE time_charge USING time_charge::time_charge",
        )
        .await?;
        db.execute_unprepared("ALTER TABLE records ALTER COLUMN task TYPE task USING task::task")
            .await?;

        manager
            .alter_table(
                Table::alter()
                    .table(Records::Table)
                    .modify_column(ColumnDef::new(Records::Mileage).integer().null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_type(Type::drop().name(TimeCharge::name()).to_owned())
            .await?;
        manager
            .drop_type(Type::drop().name(Task::name()).to_owned())
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Records::Table)
                    .modify_column(ColumnDef::new(Records::Task).string().not_null())
                    .modify_column(ColumnDef::new(Records::TimeCharge).string().not_null())
                    .modify_column(ColumnDef::new(Records::Mileage).integer().not_null())
                    .to_owned(),
            )
            .await
    }
}

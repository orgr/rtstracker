use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[derive(DeriveIden)]
enum Records {
    Table,
    Date,
    Project,
    Task,
    TimeCharge,
    Time,
    Mileage,
    MileageChargable,
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Records::Table)
                    .modify_column(ColumnDef::new(Records::Date).date().not_null())
                    .modify_column(ColumnDef::new(Records::Project).string().not_null())
                    .modify_column(ColumnDef::new(Records::Task).string().not_null())
                    .modify_column(ColumnDef::new(Records::TimeCharge).string().not_null())
                    .modify_column(ColumnDef::new(Records::Time).integer().not_null())
                    .modify_column(ColumnDef::new(Records::Mileage).integer().not_null())
                    .modify_column(
                        ColumnDef::new(Records::MileageChargable)
                            .boolean()
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Records::Table)
                    .modify_column(ColumnDef::new(Records::Date).date().null())
                    .modify_column(ColumnDef::new(Records::Project).string().null())
                    .modify_column(ColumnDef::new(Records::Task).string().null())
                    .modify_column(ColumnDef::new(Records::TimeCharge).string().null())
                    .modify_column(ColumnDef::new(Records::Time).integer().null())
                    .modify_column(ColumnDef::new(Records::Mileage).integer().null())
                    .modify_column(ColumnDef::new(Records::MileageChargable).boolean().null())
                    .to_owned(),
            )
            .await
    }
}

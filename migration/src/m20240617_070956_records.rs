use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                table_auto(Records::Table)
                    .col(pk_auto(Records::Id))
                    .col(date_null(Records::Date))
                    .col(integer(Records::UserId))
                    .col(integer(Records::WmuId))
                    .col(string_null(Records::Project))
                    .col(string_null(Records::Task))
                    .col(string_null(Records::TimeCharge))
                    .col(text_null(Records::Description))
                    .col(integer_null(Records::Time))
                    .col(integer_null(Records::Mileage))
                    .col(boolean_null(Records::MileageChargable))
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-records-users")
                            .from(Records::Table, Records::UserId)
                            .to(Users::Table, Users::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-records-wmus")
                            .from(Records::Table, Records::WmuId)
                            .to(Wmus::Table, Wmus::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Records::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Records {
    Table,
    Id,
    Date,
    UserId,
    WmuId,
    Project,
    Task,
    TimeCharge,
    Description,
    Time,
    Mileage,
    MileageChargable,
}

#[derive(DeriveIden)]
enum Users {
    Table,
    Id,
}
#[derive(DeriveIden)]
enum Wmus {
    Table,
    Id,
}

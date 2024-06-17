use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                table_auto(Wmus::Table)
                    .col(pk_auto(Wmus::Id))
                    .col(text_null(Wmus::Description))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Wmus::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Wmus {
    Table,
    Id,
    Description,
    
}



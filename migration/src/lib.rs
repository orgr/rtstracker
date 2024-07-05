#![allow(elided_lifetimes_in_paths)]
#![allow(clippy::wildcard_imports)]
pub use sea_orm_migration::prelude::*;

mod m20220101_000001_users;
mod m20231103_114510_notes;

mod m20240617_070915_wmus;
mod m20240617_070956_records;
mod m20240619_171005_alter_records;
mod m20240626_221043_extend_wmus;
mod m20240703_105036_alter_records_add_enum_optional_mileage;
pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_users::Migration),
            Box::new(m20231103_114510_notes::Migration),
            Box::new(m20240617_070915_wmus::Migration),
            Box::new(m20240617_070956_records::Migration),
            Box::new(m20240619_171005_alter_records::Migration),
            Box::new(m20240626_221043_extend_wmus::Migration),
            Box::new(m20240703_105036_alter_records_add_enum_optional_mileage::Migration),
        ]
    }
}

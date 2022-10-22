export default {
  deleteNonAdminUsers: `DELETE FROM mimock_schema_dev.USERS where user_name <> 'mimock_admin'`,
  deleteAllMocks: `delete from mocks`,
};

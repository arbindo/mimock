export default {
  deleteNonAdminUsers: `DELETE FROM mimock_schema_dev.USERS where user_name <> 'mimock_admin'`,
  deleteAllMocks: `delete from mocks`,
  deleteTextResponse: `delete from textual_responses`,
  deleteBinaryResponse: `delete from binary_responses`,
  insertTextResponse: `
                    insert into textual_responses(id, response_body, created_at)
                    values (101, '{}', current_timestamp)
  `,
  insertTextMock: `
                    insert into mocks(mock_id, mock_name, route, method_id, response_content_type_id, textual_response_id,
                    description, created_at, entity_status_id,
                    created_by, modified_by)
                    values ('8bd45306-e082-4849-8755-9747f4f5ce64', 'Text Mock', '/textmock',
                    (select id from http_methods where method = 'GET'),
                    (select id from response_content_types where content_type = 'application/json'),
                    101, 'This is a text mock', current_timestamp, (select id from entity_status where status = 'NONE'),
                    'mimock_admin', 'mimock_admin')
  `,
  insertBinaryResponse: `
                    insert into binary_responses(id, response_file, created_at)
                    values (201, '0x52494646B6DD01005745425', current_timestamp)
  `,
  insertBinaryMock: `
                    insert into mocks(mock_id, mock_name, route, method_id, response_content_type_id, binary_response_id,
                    description, created_at, entity_status_id,
                    created_by, modified_by)
                    values ('54584b98-3f97-4fb8-8e84-9240c954a725', 'Binary Mock', '/binarymock',
                    (select id from http_methods where method = 'POST'),
                    (select id from response_content_types where content_type = 'application/pdf'),
                    201, 'This is a PDF mock', current_timestamp, (select id from entity_status where status = 'NONE'),
                    'mimock_admin', 'mimock_admin')
  `,
  insertArchivedMock: `
                    insert into mocks(mock_id, mock_name, route, method_id, response_content_type_id,
                    description, created_at, entity_status_id,
                    created_by, modified_by)
                    values ('0ef8f8bd-1673-4274-8cef-9963d4575bdb', 'Archived Mock', '/archivedmock',
                    (select id from http_methods where method = 'GET'),
                    (select id from response_content_types where content_type = 'application/json'),
                    'This is an archived mock', current_timestamp, (select id from entity_status where status = 'ARCHIVED'),
                    'mimock_admin', 'mimock_admin')
  `,
  insertDeletedMock: `
                    insert into mocks(mock_id, mock_name, route, method_id, response_content_type_id,
                    description, created_at, entity_status_id,
                    created_by, modified_by)
                    values ('b3c3391c-6053-4d7f-a6b4-cab038666625', 'Deleted Mock', '/deletedmock',
                    (select id from http_methods where method = 'HEAD'),
                    (select id from response_content_types where content_type = 'application/json'),
                    'This is an deleted mock', current_timestamp, (select id from entity_status where status = 'DELETED'),
                    'mimock_admin', 'mimock_admin')
  `,
};

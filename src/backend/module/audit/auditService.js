const DataBaseService = require('@helpersBackend/dataBase');
const dataBaseService = new DataBaseService();

class AuditService {
  async getAudit() {
    const sql = `select audit.event_type, audit.event_date, user.email, audit.error_log from audit_log audit left join users user on audit.user_id = user.id order by audit.id desc;`;
    return await dataBaseService.getDataWithCustomQuery(sql)
  }
}

module.exports = AuditService;

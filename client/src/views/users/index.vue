<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="คำค้นหา" style="width: 200px;" class="filter-item" />
      <el-select v-model="listQuery.type" placeholder="ประเภท" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in user_type_options" :key="item.user_type_id" :label="user_type_th[item.user_type_name]" :value="item.user_type_id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getUserList()">
        ค้นหา
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate()">
        เพิ่มผู้ใช้งาน
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="data_table"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ประเภท" prop="user_type_id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ user_type_th[row.user_type_name] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ชื่อ-นามสกุล">
        <template slot-scope="{row}">
          <span>{{ row.title_text+row.firstname+' '+row.lastname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="อีเมล" prop="email">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="เบอร์โทรศัพท์" prop="tel">
        <template slot-scope="{row}">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ชื่อผู้ใช้งาน" prop="username">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="วันที่เพิ่มข้อมูล" prop="created_at" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" :disabled="true" @click="handleUpdate(row)">
            แก้ไข
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            ลบ
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- CREATE USER DIALOG -->
    <el-dialog title="เพิ่มผู้ใช้งาน" :visible.sync="dialogFormVisible" top="5vh">
      <el-form ref="dataForm" :model="dialogForm" label-position="left" label-width="170px">
        <el-form-item label="ประเภทผู้ใช้งาน" required>
          <el-select v-model="dialogForm.user_type_id" style="width: 100%">
            <el-option v-for="item in user_type_options" :key="item.user_type_id" :label="user_type_th[item.user_type_name]" :value="item.user_type_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="คำนำหน้า" required>
          <el-select v-model="dialogForm.title_id" style="width: 100%">
            <el-option v-for="item in title_name_options" :key="item.title_id" :label="item.title_text" :value="item.title_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="ชื่อ" required>
          <el-input v-model="dialogForm.firstname" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="นามสกุล" required>
          <el-input v-model="dialogForm.lastname" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="อีเมล">
          <el-input v-model="dialogForm.email" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="เบอร์โทรศัพท์">
          <el-input v-model="dialogForm.tel" maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="ชื่อผู้ใช้งาน" required>
          <el-input v-model="dialogForm.username" maxlength="25" show-word-limit />
        </el-form-item>
        <el-form-item label="รหัสผ่าน" required>
          <el-input v-model="dialogForm.password" type="password" maxlength="25" show-word-limit />
        </el-form-item>
        <el-form-item label="ยืนยันรหัสผ่าน" required>
          <el-input v-model="dialogForm.repass" type="password" maxlength="25" show-word-limit />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          ย้อนกลับ
        </el-button>
        <el-button type="primary" @click="createUser()">
          ยืนยัน
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState, mapActions } from 'vuex'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      dialogForm: {
        user_type_id: '',
        title_id: '',
        firstname: '',
        lastname: '',
        email: '',
        tel: '',
        username: '',
        password: '',
        repass: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      user_type_th: {
        admin: 'ผู้ดูแลระบบ',
        teacher: 'ครูผู้สอน',
        student: 'นักเรียน',
        staff: 'เจ้าหน้าที่'
      },
      temp: {}
    }
  },
  created() {
    this.getList()
    this.$store.dispatch('user/getUserType')
    this.$store.dispatch('user/getTitleNameList')
    this.getUserList()
  },
  computed: {
    ...mapState({
      user_type_options: store => store.user.user_type_options,
      title_name_options: store => store.user.title_name_options,
      data_table: store => store.user.data_table
    })
  },
  methods: {
    ...mapActions({
      getUserList: 'user/getUserMemberList',
      removeUser: 'user/removeUser'
    }),
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.dialogForm = {
        user_type_id: '',
        title_id: '',
        firstname: '',
        lastname: '',
        email: '',
        tel: '',
        username: '',
        password: '',
        repass: ''
      }
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('ลบผู้ใช้งาน', 'แจ้งเตือน', 'danger')
        .then(() => {
          this.removeUser({ 'user_member_id': row.user_member_id, 'index': index })
        }).catch(() => {})
      // this.$notify({
      //   title: 'Success',
      //   message: 'ลบข้อมูลสำเร็จ',
      //   type: 'success',
      //   duration: 2000
      // })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    createUser() {
      if (!this.dialogForm.user_type_id) {
        this.$message({
          message: 'กรุณาระบุประเภทผู้ใช้งาน',
          type: 'warning'
        })
      } else if (!this.dialogForm.title_id) {
        this.$message({
          message: 'กรุณาระบุคำนำหน้าชื่อ',
          type: 'warning'
        })
      } else if (!this.dialogForm.firstname) {
        this.$message({
          message: 'กรุณาระบุชื่อ',
          type: 'warning'
        })
      } else if (!this.dialogForm.lastname) {
        this.$message({
          message: 'กรุณาระบุนามสกุล',
          type: 'warning'
        })
      } else if (this.dialogForm.username.length < 4) {
        this.$message({
          message: 'กรุณาระบุชื่อผู้ใช้งานมากกว่า 4 ตัวอักษร',
          type: 'warning'
        })
      } else if (this.dialogForm.password.length < 6) {
        this.$message({
          message: 'กรุณาระบุรหัสผ่านมากกว่า 6 ตัวอักษร',
          type: 'warning'
        })
      } else if (this.dialogForm.repass !== this.dialogForm.password) {
        this.$message({
          message: 'กรุณายืนยันรหัสผ่านให้ตรงกัน',
          type: 'warning'
        })
      } else {
        var formdata = this.dialogForm
        this.$store.dispatch('user/createUser', formdata)
        this.dialogFormVisible = false
        this.dialogForm = {
          user_type_id: '',
          title_id: '',
          firstname: '',
          lastname: '',
          email: '',
          tel: '',
          username: '',
          password: '',
          repass: ''
        }
      }
    }
  }
}
</script>

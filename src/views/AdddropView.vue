<template>
  <v-main
    ><br />
    <v-card class="text-center" color="blue-lighten-3">
      <h1>เพิ่ม-ถอนรายวิชา</h1> </v-card
    ><br />
    <v-sheet width="500" class="mx-auto">
      <v-form>
        <label class="form-label" for="form6Example1">ชื่อวิชา</label>
        <v-text-field
          v-model="formData.coursename"
          :required="true"
          label="ใส่ชื่อวิชา"
        ></v-text-field>

        <label class="form-label" for="form6Example3"> รหัสวิชา </label>

        <v-text-field
          name="courseid"
          v-model="formData.courseid"
          required
          label="ใส่รหัสวิชา"
        ></v-text-field>
        <label class="form-label" for="form6Example7">คำอธิบายรายวิชา</label>

        <v-textarea
          v-model="formData.description"
          name="descript"
          counter
          label="คำอธิบายรายวิชา"
          :rules="rules"
          :model-value="value"
          required
        ></v-textarea>

        <!-- Text input -->

        <label class="form-label" for="form6Example4">จำนวนชั่วโมง</label>
        <v-text-field
          id="form6Example4"
          placeholder="บรรยาย"
          name="hour1"
          type="number"
          step="any"
          min="0"
          ref="input"
          :rules="[numberRule]"
          v-model.number="formData.hour1"
          required
        ></v-text-field>
        <v-text-field
          id="form6Example4"
          placeholder="ปฏิบัติ"
          name="hour2"
          type="number"
          step="any"
          min="0"
          ref="input"
          :rules="[numberRule]"
          v-model.number="formData.hour2"
          required
        ></v-text-field>

        <!-- Email input -->

        <label class="form-label" for="form6Example5">ผู้สอน</label>
        <v-text-field
          type="text"
          id="form6Example5"
          name="instructor"
          placeholder="ใส่ชื่ออาจารย์ผู้สอน"
          v-model="formData.instructor"
          required
        ></v-text-field>

        <!-- Submit button -->
        <button
          type="submit"
          class="btn btn-primary btn-block mb-4"
          @click.prevent="confirmAndSubmit"
        >
          Submit
        </button>
      </v-form>
    </v-sheet>

    <div class="boxAccordion">
      <div
        class="accordion"
        id="accordionPanelsStayOpenExample"
        v-for="(data, i) in Data"
        v-bind:key="i"
      >
        <div class="accordion-item" style="width: 100%">
          <h2 class="accordion-header" :id="'panelsStayOpen-heading' + i">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#panelsStayOpen-collapse' + i"
              aria-expanded="true"
              :aria-controls="'panelsStayOpen-collapse' + i"
            >
              <h5>
                รหัสวิชา : {{ data.courseid }} <br />
                ชื่อวิชา {{ data.coursename }} <br />
                ผู้สอน {{ data.instructor }}
              </h5>
            </button>
          </h2>
          <div
            :id="'panelsStayOpen-collapse' + i"
            class="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" style="width: 20px">หัวข้อ</th>
                  <th scope="col">คำอธิบาย</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">ชื่อวิชา</th>
                  <td>{{ data.coursename }}</td>
                </tr>
                <tr>
                  <th scope="row">รหัสวิชา</th>
                  <td>{{ data.courseid }}</td>
                </tr>
                <tr>
                  <th scope="row" style="">คำอธิบายรายวิชา</th>
                  <td style="">{{ data.description }}}</td>
                </tr>
                <tr>
                  <th scope="row">จำนวนชั่วโมง</th>
                  <td>
                    บรรยาย {{ data.hour1 }} ชั่วโมง | ปฏิบัติ
                    {{ data.hour2 }} ชั่วโมง
                  </td>
                </tr>
                <tr>
                  <th scope="row">ผู้สอน</th>
                  <td>{{ data.instructor }}</td>
                </tr>
              </tbody>
            </table>
            <div class="btngo">
              <button
                type="button"
                class="btn btn-danger"
                @click="removeData(i)"
                style=""
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>



<script setup>
import { defineComponent } from "vue";
import { useCourseStore } from "@/stores/add-drop";
import { RouterLink, RouterView } from "vue-router";
const CourseState = useCourseStore();
</script>




<script>
export default defineComponent({
  data() {
    return {
      formData: {
        coursename: "",
        courseid: "",
        description: "",
        hour1: Number,
        hour2: Number,
        instructor: "",
      },
    };
  },

  setup() {
    const Data = CourseState.$state.courses;
    return { Data };
  },

  methods: {
    onSubmit() {
      if (this.formData) {
        CourseState.pushState(this.formData);
        console.log(CourseState.$state.courses);
        this.formData = {
          coursename: "",
          courseid: "",
          description: "",
          hour1: Number,
          hour2: Number,
          instructor: "",
        };
      }
    },
    removeData(index) {
      if (confirm("Are you sure you want to remove this form data?")) {
        this.Data.splice(index, 1);
      }
    },
    confirmAndSubmit() {
      if (window.confirm("Are you sure you want to submit the form?")) {
        this.onSubmit();
      }
    },
  },
});
</script>
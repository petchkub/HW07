import { ref } from "vue";
import { defineStore } from "pinia";

export const Course = {
    coursename: "",
    courseid: "",
    description: "",
    hour1: "",
    hour2: "",
    instructor: "", 
}

export const useCourseStore = defineStore('CourseState', {
    state:() => {
        return{
            courses: [],
        }
    },
    getters:{
        getCourses: (state) => state.courses
    },
    actions: {
        pushstate(course){
            this.$state.courses.push(course)
        }
    }
})
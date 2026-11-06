// ============================================
// 1. هيكلة بيانات الطالب (Class & Constructor)
// ============================================
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;               // رقم الجلوس
        this.name = name;           // الاسم
        this.grades = grades;       // مصفوفة درجات 3 مواد
        this.attendance = attendance; // نسبة الحضور
    }

    // ============================================
    // 2. دوال التحليل الأكاديمي (Methods)
    // ============================================

    // حساب المتوسط باستخدام reduce
    calculateAverage() {
        const sum = this.grades.reduce((total, grade) => total + grade, 0);
        return sum / this.grades.length;
    }

    // دالة التقدير
    getGradeLetter(average) {
        if (average >= 90) return "A";
        else if (average >= 80) return "B";
        else if (average >= 70) return "C";
        else if (average >= 60) return "D";
        else if (average >= 50) return "E";
        else return "F";
    }

    // النتيجة النهائية
    getFinalResult() {
        const average = this.calculateAverage();
        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// ============================================
// 3. نظام تشغيل الجامعة (Objects Array)
// ============================================
const studentsList = [
    new Student(101, "أحمد محمد", [85, 90, 88], 95),
    new Student(102, "سارة علي", [45, 48, 42], 80),   // متعثر
    new Student(103, "خالد حسن", [70, 75, 68], 60),
    new Student(104, "نور إبراهيم", [40, 47, 45], 90)  // متعثر
];

// ============================================
// 5. المخرجات - تقرير لكل طالب
// ============================================
console.log("========== تقرير الطلاب ==========");
studentsList.forEach(student => {
    const avg = student.calculateAverage();
    console.log(`
الاسم        : ${student.name}
المتوسط      : ${avg.toFixed(2)}
التقدير      : ${student.getGradeLetter(avg)}
النتيجة      : ${student.getFinalResult()}
------------------------------`);
});

// ============================================
// 4. لجنة الرأفة (Array Methods)
// ============================================

// الاستخراج: الطلاب المتعثرين (متوسط بين 40 و 49)
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg <= 49;
});

// المعالجة: إضافة 5 درجات رأفة باستخدام map
const afterMercy = strugglingStudents.map(student => {
    const oldAvg = student.calculateAverage();
    return {
        name: student.name,
        oldAverage: oldAvg,
        newAverage: oldAvg + 5
    };
});

// التحليل: جمع المتوسطات الجديدة باستخدام reduce
const totalNewAverages = afterMercy.reduce((sum, student) => {
    return sum + student.newAverage;
}, 0);

// متوسط الرأفة مع درع حماية (منع القسمة على صفر)
const mercyAverage = afterMercy.length > 0 
    ? totalNewAverages / afterMercy.length 
    : 0;

// ============================================
// طباعة نتائج لجنة الرأفة
// ============================================
console.log("\n========== لجنة الرأفة ==========");
console.log("الطلاب الذين شملتهم الرأفة:");
console.table(afterMercy);

console.log(`\nمتوسط درجات الطلاب المتعثرين بعد التعديل: ${mercyAverage.toFixed(2)}`);
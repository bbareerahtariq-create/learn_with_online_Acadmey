
/* Learn with Bareerah Online Academy */

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Mobile menu band karna
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Footer year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Course button par click karne se course select ho
document.querySelectorAll("[data-course]").forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("course").value =
            button.dataset.course;
    });
});

// Firebase admission form
const form = document.getElementById("admissionForm");
const formMessage = document.getElementById("formMessage");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message";

    const studentName =
        document.getElementById("studentName").value.trim();

    const studentAge =
        Number(document.getElementById("studentAge").value);

    const studentType =
        document.getElementById("studentType").value;

    const course =
        document.getElementById("course").value;

    const contact =
        document.getElementById("contact").value.trim();

    const timing =
        document.getElementById("timing").value;

    const message =
        document.getElementById("message").value.trim();

    if (
        !studentName ||
        !Number.isInteger(studentAge) ||
        studentAge < 3 ||
        studentAge > 100 ||
        !studentType ||
        !course ||
        !contact ||
        !timing
    ) {
        formMessage.textContent =
            "Please tamam required fields sahi tarah fill karein.";
        formMessage.classList.add("error");
        return;
    }

    const admission = {
        studentName,
        studentAge,
        studentType,
        course,
        contact,
        timing,
        message,
        submittedAt: new Date().toISOString()
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
        await db.collection("admissions").add(admission);

        formMessage.textContent =
            "Admission successfully submit ho gayi! Academy aapse contact karegi.";
        formMessage.classList.add("success");

        form.reset();
    } catch (error) {
        console.error("Firebase admission error:", error);

        formMessage.textContent =
            "Admission save nahi hui. Please dobara try karein.";
        formMessage.classList.add("error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Admission";
    }
});

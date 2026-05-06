import { getItem, setItem } from "./storage.js";

class CustomerFormHandler {
    constructor(formId, messageId) {
        this.form = document.getElementById(formId);
        this.messageBox = document.getElementById(messageId);
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const result = this.validateForm();

            if (!result.isValid) {
                this.showMessage("Please fix validation errors.", "danger");
                return;
            }

            this.saveToLocalStorage(result.values);
            this.showMessage("Form submitted successfully.", "success");
            this.clearForm();
        });

        this.form.addEventListener("input", (event) => {
            if (event.target.matches("input, textarea")) {
                this.validateField(event.target);
            }
        });

        this.form.addEventListener("focusout", (event) => {
            if (event.target.matches("input, textarea")) {
                this.validateField(event.target);
            }
        });
    }

    normalizeDate(dateString) {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    fieldRules(values) {
        const today = this.getToday();
        const checkIn = this.normalizeDate(values.checkInDate);
        const checkOut = this.normalizeDate(values.checkOutDate);

        return {
            fullName: values.fullName.length >= 3 ? "" : "Name must be at least 3 characters.",
            phone: /^\d{10}$/.test(values.phone) ? "" : "Phone must be exactly 10 digits.",
            email: this.emailRegex.test(values.email) ? "" : "Enter a valid email address.",
            address: values.address ? "" : "Address is required.",
            aadhar: /^\d{12}$/.test(values.aadhar) ? "" : "Aadhar must be exactly 12 digits.",
            checkInDate: !values.checkInDate || checkIn <= today ? "Check in date must be a future date." : "",
            checkOutDate: !values.checkOutDate
                ? "Check out date is required."
                : checkOut <= today
                    ? "Check out date must be a future date."
                    : checkOut <= checkIn
                        ? "Check out date must be after check in date."
                        : "",
            adults: /^\d+$/.test(values.adults) && Number(values.adults) > 0 ? "" : "Adults must be a valid number greater than 0.",
            purpose: values.purpose ? "" : "Purpose of visit is required."
        };
    }

    getFormValues() {
        return {
            fullName: this.form.fullName.value.trim(),
            phone: this.form.phone.value.trim(),
            email: this.form.email.value.trim(),
            address: this.form.address.value.trim(),
            aadhar: this.form.aadhar.value.trim(),
            checkInDate: this.form.checkInDate.value,
            checkOutDate: this.form.checkOutDate.value,
            adults: this.form.adults.value.trim(),
            purpose: this.form.purpose.value.trim()
        };
    }

    validateField(field) {
        const values = this.getFormValues();
        const rules = this.fieldRules(values);
        const error = rules[field.name];
        const feedback = field.parentElement.querySelector(".invalid-feedback");

        if (error) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
            feedback.textContent = error;
            return false;
        }

        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        feedback.textContent = "";
        return true;
    }

    validateForm() {
        const values = this.getFormValues();
        const rules = this.fieldRules(values);
        let isValid = true;

        Object.keys(rules).forEach((fieldName) => {
            const field = this.form[fieldName];
            const feedback = field.parentElement.querySelector(".invalid-feedback");
            const error = rules[fieldName];

            if (error) {
                isValid = false;
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                feedback.textContent = error;
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
                feedback.textContent = "";
            }
        });

        return { isValid, values };
    }

    saveToLocalStorage(formData) {
        const records = getItem();
        records.push({
            ...formData,
            createdAt: new Date().toISOString()
        });
        setItem(records);
    }

    clearForm() {
        this.form.reset();
        this.form.querySelectorAll(".is-valid, .is-invalid").forEach((input) => {
            input.classList.remove("is-valid", "is-invalid");
        });
        this.form.querySelectorAll(".invalid-feedback").forEach((block) => {
            block.textContent = "";
        });
    }

    showMessage(message, type) {
        this.messageBox.className = `alert alert-${type}`;
        this.messageBox.textContent = message;
        this.messageBox.classList.remove("d-none");
    }
}

new CustomerFormHandler("guestForm", "formMessage");

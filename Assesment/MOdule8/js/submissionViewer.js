import { getItem, setItem } from "./storage.js";

class SubmissionViewer {
    constructor() {
        this.searchInput = document.getElementById("searchInput");
        this.tableBody = document.getElementById("submissionTableBody");
        this.emptyState = document.getElementById("emptyState");
        this.records = getItem();
        this.filtered = [...this.records];

        this.bindEvents();
        this.renderTable();
    }

    bindEvents() {
        this.searchInput.addEventListener("input", (event) => {
            const query = event.target.value.trim().toLowerCase();
            this.filtered = this.records.filter((record) => {
                return record.fullName.toLowerCase().includes(query)
                    || record.checkInDate.includes(query)
                    || record.checkOutDate.includes(query);
            });
            this.renderTable();
        });

        this.tableBody.addEventListener("click", (event) => {
            if (!event.target.matches("[data-delete-index]")) {
                return;
            }

            const index = Number(event.target.dataset.deleteIndex);
            this.deleteRecord(index);
        });
    }

    deleteRecord(index) {
        this.records.splice(index, 1);
        setItem(this.records);

        const query = this.searchInput.value.trim().toLowerCase();
        this.filtered = this.records.filter((record) => {
            return record.fullName.toLowerCase().includes(query)
                || record.checkInDate.includes(query)
                || record.checkOutDate.includes(query);
        });

        this.renderTable();
    }

    renderTable() {
        if (!this.filtered.length) {
            this.tableBody.innerHTML = "";
            this.emptyState.classList.remove("d-none");
            return;
        }

        this.emptyState.classList.add("d-none");
        this.tableBody.innerHTML = this.filtered
            .map((record) => {
                const realIndex = this.records.findIndex((item) => item.createdAt === record.createdAt);
                return `
                    <tr>
                        <td>${record.fullName}</td>
                        <td>${record.phone}</td>
                        <td>${record.email}</td>
                        <td>${record.aadhar}</td>
                        <td>${record.address}</td>
                        <td>${record.checkInDate}</td>
                        <td>${record.checkOutDate}</td>
                        <td>${record.adults}</td>
                        <td>${record.purpose}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-danger" data-delete-index="${realIndex}">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            })
            .join("");
    }
}

new SubmissionViewer();

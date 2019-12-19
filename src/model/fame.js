class Fame {
    constructor(fame) {
        if (fame) {
            this.id = fame.id
            this.name = fame.name
            this.dob = fame.dob
            this.image = fame.image
        }
    }

    static from(fame) {
        return new Fame(fame);
    }

    getId() {
        return this.id || ""
    }

    getName() {
        return this.name || ""
    }

    getDob() {
        return this.dob || ""
    }

    getImage() {
        return this.image || ""
    }
}

export default Fame
export class WebsiteUser{
    constructor(
        public email: string,
        public role: number = 1,
        public uid?
        ) {}
}

// 3 Roles
// - 1 client
// - 2 admin
// - 3 manager
//admin user:
//email: admin@admin.pl
//pass: testtest

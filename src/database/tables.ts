export type Role =
  | { role: 3; name: "user" }
  | { role: 2; name: "admin" }
  | { role: 1; name: "super" }
  | { role: 4; name: "debugger" }
  | { role: 5; name: "ngo" }
  | { role: 6; name: "donor" };

export type Permission = {
  name: string;
};
export type UserPermission = {
  id: number;
  edit: boolean;
  view: boolean;
  delete: boolean;
  add: boolean;
  permission: string;
  icon: string;
  priority: number;
};
export type SelectUserPermission = UserPermission & {
  allSelected: boolean;
};
export type Contact = {
  id: string;
  value: string;
  createdAt: string;
};
export type Email = {
  id: string;
  value: string;
  createdAt: string;
};
export type User = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  status: boolean;
  grantPermission: boolean;
  profile: any;
  role: Role;
  contact: string;
  job: string;
  destination: string;
  permissions: Map<string, UserPermission>;
  createdAt: string;
};

export type Notifications = {
  id: string;
  message: string;
  type: string;
  read_status: number;
  created_at: string;
};
export type Job = {
  id: string;
  name: string;
  createdAt: string;
};
// APPLICATION

export type DestinationType = {
  id: string;
  name: string;
  createdAt: string;
};
export type Destination = {
  id: string;
  name: string;
  color: string;
  type: DestinationType;
  createdAt: string;
};

export type Country = {
  id: string;
  name: string;
};
export type Distric = {
  id: string;
  name: string;
};
export type Address = {
  id: string;
  country: Country;
  district: Distric;
  area: string;
};

export type Audit = {
  id: string;
  user_id: string;
  user: string;
  action: string;
  table: string;
  table_id: string;
  old_values: any;
  new_values: any;
  url: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
};
// App
export type NgoStatus = "block" | "active" | "inactive" | "mou_not_reg";
export type NgoType = {
  id: string;
  name: string;
  createdAt: string;
};
export type Ngo = {
  id: string;
  profile: string;
  name: string;
  abbr: string;
  status: NgoStatus;
  registrationNo: string;
  dateOfEstablishment: string;
  expireDate: string;
  type: NgoType;
  moeRegistrationNo: string;
  placeOfEstablishment: string;
  email: Email;
  contact: Contact;
  createdAt: string;
  address: Address;
};


export type News = {
  id: string;
  newsType: {
    id: string;
    name: string;
    createdAt: string;
  };
  priority: {
    id: string;
    name: string;
    createdAt: string;
  };
  user: {
    id: string;
    profile: string;
    fullName: string;
    username: string;
    job: string;
    createdAt: string;
  };
  visible: boolean;
  expiry_date: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
};
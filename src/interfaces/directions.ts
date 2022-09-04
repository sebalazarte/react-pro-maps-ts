// Generated by https://quicktype.io

export interface DirectionsResponse {
    routes:    Route[];
    waypoints: Waypoint[];
    code:      string;
    uuid:      string;
}

export interface Route {
    country_crossed: boolean;
    weight_name:     string;
    weight:          number;
    duration:        number;
    distance:        number;
    legs:            Leg[];
    geometry:        Geometry;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type:        GeometryType;
}

export enum GeometryType {
    LineString = "LineString",
}

export interface Leg {
    via_waypoints: any[];
    admins:        Admin[];
    weight:        number;
    duration:      number;
    steps:         Step[];
    distance:      number;
    summary:       string;
}

export interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1:        string;
}

export interface Step {
    intersections: Intersection[];
    maneuver:      Maneuver;
    name:          string;
    duration:      number;
    distance:      number;
    driving_side:  DrivingSide;
    weight:        number;
    mode:          Mode;
    geometry:      Geometry;
    ref?:          string;
    rotary_name?:  string;
    destinations?: string;
}

export enum DrivingSide {
    Left = "left",
    Right = "right",
    SlightLeft = "slight left",
    SlightRight = "slight right",
    Straight = "straight",
}

export interface Intersection {
    bearings:           number[];
    entry:              boolean[];
    traffic_signal?:    boolean;
    mapbox_streets_v8?: MapboxStreetsV8;
    is_urban?:          boolean;
    admin_index:        number;
    out?:               number;
    geometry_index:     number;
    location:           number[];
    in?:                number;
    turn_weight?:       number;
    turn_duration?:     number;
    duration?:          number;
    weight?:            number;
    classes?:           Class[];
    toll_collection?:   TollCollection;
    lanes?:             Lane[];
    railway_crossing?:  boolean;
}

export enum Class {
    Motorway = "motorway",
    Primary = "primary",
    PrimaryLink = "primary_link",
    Roundabout = "roundabout",
    Secondary = "secondary",
    SecondaryLink = "secondary_link",
    Street = "street",
    Trunk = "trunk",
    TrunkLink = "trunk_link",
}

export interface Lane {
    indications:       DrivingSide[];
    valid:             boolean;
    active:            boolean;
    valid_indication?: DrivingSide;
}

export interface MapboxStreetsV8 {
    class: Class;
}

export interface TollCollection {
    type:  TollCollectionType;
    name?: string;
}

export enum TollCollectionType {
    TollBooth = "toll_booth",
}

export interface Maneuver {
    type:           string;
    instruction:    string;
    bearing_after:  number;
    bearing_before: number;
    location:       number[];
    modifier?:      DrivingSide;
    exit?:          number;
}

export enum Mode {
    Driving = "driving",
}

export interface Waypoint {
    distance: number;
    name:     string;
    location: number[];
}
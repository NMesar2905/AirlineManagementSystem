package com.api.AirlineManagementSystemSpring.dto;

import java.sql.Date;

public record ReservationDTO(Integer aadhar, String src, String des, Date ddate) {
}

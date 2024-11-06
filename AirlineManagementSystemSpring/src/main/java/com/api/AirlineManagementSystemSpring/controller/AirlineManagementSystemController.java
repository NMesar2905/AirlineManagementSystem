package com.api.AirlineManagementSystemSpring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.AirlineManagementSystemSpring.dto.FlightListInfo;
import com.api.AirlineManagementSystemSpring.dto.PassengerDTO;
import com.api.AirlineManagementSystemSpring.dto.ReservationDTO;
import com.api.AirlineManagementSystemSpring.entities.Passenger;
import com.api.AirlineManagementSystemSpring.entities.Reservation;
import com.api.AirlineManagementSystemSpring.exceptions.ResourceNotFoundException;
import com.api.AirlineManagementSystemSpring.repository.FlightRepository;
import com.api.AirlineManagementSystemSpring.repository.PassengerRepository;
import com.api.AirlineManagementSystemSpring.repository.ReservationRepository;
import com.api.AirlineManagementSystemSpring.services.CancelService;
import com.api.AirlineManagementSystemSpring.services.ReservationService;

@RestController
@RequestMapping("/ams")
public class AirlineManagementSystemController {

	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	private PassengerRepository passengerRepository;

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private ReservationService reservationService;

	@Autowired
	private CancelService cancelService;

	@GetMapping("/flights")
	public List<FlightListInfo> getFlightList() {
		return flightRepository.findAll().stream().map(FlightListInfo::new).toList();
	}

	@PostMapping("/passenger/creation")
	public ResponseEntity<?> createPassenger(@RequestBody PassengerDTO passengerDTO) {

		if (passengerRepository.existsById(passengerDTO.aadhar())) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("Passenger with Aadhar " + passengerDTO.aadhar() + " already exists.");
		} else {
			passengerRepository.save(new Passenger(passengerDTO));
			return ResponseEntity.status(HttpStatus.CREATED).body("Customer Details Added Succesfully");
		}

	}

	@PostMapping("/passenger/reservation")
	public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservationDTO) {
		try {
			reservationService.createReservation(reservationDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body("Customer Reservation Created Succesfully");
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	@GetMapping("/passenger/journey-details")
	public ResponseEntity<?> journeyDetails(@RequestBody Map<String, String> requestBody) {
		try {
			Reservation reservation = reservationRepository.findById(requestBody.get("PNR"))
					.orElseThrow(() -> new ResourceNotFoundException("Not information found"));
			return ResponseEntity.ok(reservation);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@DeleteMapping("/passenger/cancel")
	public ResponseEntity<?> cancelReservation(@RequestBody Map<String, String> requestBody) {
		try {
			cancelService.cancelReservation(requestBody);
			return ResponseEntity.ok("Ticket Cancelled");
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

}

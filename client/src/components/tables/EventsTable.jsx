import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Box
} from "@mui/material";
import EventRegistrationsModal from "../EventRegistrationsModal";



function EventsTable({ events }) {


    {/* Event Management Section */ }
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleRegistrationClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    return (
        <div>
            <Box>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#333", marginBottom: 2 }}>
                    Event Management
                </Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>Event Title</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Organizer</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Registrations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id} hover>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{formatDate(event.date)}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={event.event_type}
                                            color="secondary"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{event.organizer_name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleRegistrationClick(event)}
                                            sx={{
                                                backgroundColor: "#0e6b04ff",
                                                '&:hover': {
                                                    backgroundColor: "#0e6b04ff"
                                                }
                                            }}
                                        >
                                            {event.registration_count}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Event Registrations Modal */}
            <EventRegistrationsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                eventId={selectedEvent?.id}
                eventTitle={selectedEvent?.title}
            />
        </div>
    );
}

export default EventsTable;
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function SearchBar({ label, searchTerm, onSearch, type }) {
  return (
    <div>
      {type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            variant="outlined"
            margin="normal"
            label={label}
            value={searchTerm}
            onChange={onSearch}
            enableAccessibleFieldDOMStructure={false}
            slots={{ textField: (params) => <TextField {...params} style={{ margin: '15px 0' }} /> }}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          label={label}
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={onSearch}
        />
      )}
    </div>
    )
}

export default SearchBar;
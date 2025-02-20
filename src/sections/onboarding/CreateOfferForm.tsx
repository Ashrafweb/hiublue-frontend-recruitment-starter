// components/CreateOfferForm.tsx
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Autocomplete,
  Box,
  FormGroup,
  Button,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOffer, getUsers } from "@/lib/apiClient"; // Import your API function
import { CreateOfferFormData, CreateOfferFormSchema } from "@/lib/validations";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import SuccessModal from "@/theme/overrides/components/SuccessModal";

const CreateOfferForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOfferFormData>({
    resolver: zodResolver(CreateOfferFormSchema),
    defaultValues: {
      plan_type: "pay_as_you_go",
      additions: ["refundable"],
    },
  });

  const fetchUsers = async (searchText = "") => {
    setLoadingUsers(true);
    try {
      const result = await getUsers(`search=${searchText}`);
      const users = result?.data;

      if (users) {
        setUserOptions(
          users.map((user: any) => ({ name: user.name, id: user.id }))
        );
      } else {
        console.error("Failed to fetch users or API returned null/undefined");
        // Handle the error (e.g., display a message)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle the error
    } finally {
      setLoadingUsers(false);
    }
  };

  const [userOptions, setUserOptions] = useState<
    { name: string; id: string; email: string }[]
  >([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    //fetchUsers(); // Initial fetch
    return () => {
      setUserOptions([]);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
    if (value.length > 3) {
      fetchUsers(value);
    } else {
      //fetchUsers();
    }
  };
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Store the success message

  const onSubmit = async (data: CreateOfferFormData) => {
    setIsLoading(true);
    try {
      const response = await createOffer(data);
      // Handle successful offer creation (e.g., show success message, reset form)
      console.log("Offer created successfully:", response);
      setSuccessMessage("The onboarding offer has been sent to the new user.");
      setIsSuccessModalOpen(true); // Open success modal
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error("Error creating offer:", error);
      // Optionally, you can show a MUI Snackbar or other notification component here.
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
    value: string
  ) => {
    const isChecked = event.target.checked;
    let newValue = [...field.value];

    if (isChecked) {
      newValue.push(value);
    } else {
      newValue = newValue.filter((item) => item !== value);
    }
    field.onChange(newValue);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "720px", margin: "auto" }}
      >
        <Card
          sx={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
            maxWidth: "720px",
            mx: "auto",
            mt: 4,
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #919EAB33",
              padding: "20px",
              paddingLeft: "25px",
            }}
          >
            <Typography variant='h4' gutterBottom>
              Create Offer
            </Typography>
            <Typography
              variant='subtitle1'
              component='sub'
              fontWeight={400}
              color='#9f9f9f'
              gutterBottom
            >
              Send onboarding offer to new user
            </Typography>
          </Box>
          <CardContent>
            <Grid container spacing={3} direction='column'>
              <Grid item xs={12}>
                <FormLabel
                  component='label'
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  Plan Type
                </FormLabel>
                <Controller
                  name='plan_type'
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value='pay_as_you_go'
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "#00a76f",
                              },
                            }}
                          />
                        }
                        label='Pay As You Go'
                      />
                      <FormControlLabel
                        value='monthly'
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "#00a76f",
                              },
                            }}
                          />
                        }
                        label='Monthly'
                      />
                      <FormControlLabel
                        value='yearly'
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "#00a76f",
                              },
                            }}
                          />
                        }
                        label='Yearly'
                      />
                    </RadioGroup>
                  )}
                />
                {errors.plan_type && (
                  <Typography color='error'>
                    {errors.plan_type.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormLabel
                  component='label'
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  Additions
                </FormLabel>
                <Controller
                  name='additions'
                  control={control}
                  render={({ field }) => (
                    <Box style={{ marginTop: "10px" }}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#00a76f" }}
                              checked={field.value.includes("refundable")}
                              onChange={(event) =>
                                handleCheckboxChange(event, field, "refundable")
                              }
                            />
                          }
                          label='Refundable'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#00a76f" }}
                              checked={field.value.includes("on_demand")}
                              onChange={(event) =>
                                handleCheckboxChange(event, field, "on-demand")
                              }
                            />
                          }
                          label='On Demand'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#00a76f" }}
                              checked={field.value.includes("negotiable")}
                              onChange={(event) =>
                                handleCheckboxChange(event, field, "negotiable")
                              }
                            />
                          }
                          label='Negotiable'
                        />
                      </FormGroup>
                      {errors.additions && (
                        <Typography color='error'>
                          {errors.additions.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
                {errors.additions && (
                  <Typography color='error'>
                    {errors.additions.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormLabel
                  component='label'
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  User
                </FormLabel>
                <Controller
                  name='user_id'
                  control={control}
                  render={(
                    { field, fieldState: { error } } // Access error here
                  ) => (
                    <Autocomplete
                      options={userOptions}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      loading={loadingUsers}
                      renderInput={(params) => (
                        <TextField
                          placeholder='User Name'
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                          onChange={(event) =>
                            handleSearchChange(event, event.target.value)
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        field.onChange(newValue ? newValue.id : ""); // Store the ID, not the name
                      }}
                    />
                  )}
                />
                {errors.user_id && (
                  <Typography color='error'>
                    {errors.user_id.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormLabel
                  component='label'
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  Expired
                </FormLabel>

                <Controller
                  name='expired'
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%", marginTop: "10px" }}
                        value={field.value ? dayjs(field.value) : null} // Convert string to dayjs object
                        onChange={(newValue) => {
                          field.onChange(
                            newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                          ); // Convert dayjs to string
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.expired && (
                  <Typography color='error'>
                    {errors.expired.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormLabel
                  component='label'
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  Price
                </FormLabel>
                <Controller
                  name='price'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      style={{ marginTop: "10px" }}
                      fullWidth
                      type='number'
                      {...field}
                      placeholder='$ Price'
                      error={!!errors.price}
                      onChange={(event) => {
                        const parsedValue = parseFloat(event.target.value); // Parse to float
                        field.onChange(isNaN(parsedValue) ? "" : parsedValue); // Handle NaN
                      }}
                    />
                  )}
                />
                {errors.price && (
                  <Typography color='error'>{errors.price.message}</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid item xs={12} display='flex' justifyContent='end'>
          {" "}
          {/* Use flexbox for centering */}
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={isLoading}
            sx={{
              bgcolor: "#000",
              py: 1.5,
              px: 4,
              mt: 2,
              "&:hover": {
                bgcolor: "#333",
              },
              "&:focus-visible": {
                outline: "2px solid #000",
                outlineOffset: 2,
              },
            }}
            aria-label={isLoading ? "Sending offer..." : "Send offer"}
          >
            {isLoading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              "Send Offer"
            )}{" "}
          </Button>
        </Grid>
      </form>
      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
        title='Offer Created!'
      />
    </>
  );
};

export default CreateOfferForm;

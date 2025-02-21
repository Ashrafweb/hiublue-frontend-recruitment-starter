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
import { createOffer, getUsers } from "@/lib/apiClient";
import { CreateOfferFormData, CreateOfferFormSchema } from "@/lib/validations";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import SuccessModal from "@/theme/overrides/components/SuccessModal";
import { debounce } from "lodash";

const CreateOfferForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const [userOptions, setUserOptions] = useState<
    { name: string; id: string; email: string }[]
  >([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    return () => {
      setUserOptions([]);
    };
  }, []);

  const debouncedFetchUsers = debounce(fetchUsers, 1000);

  const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
    debouncedFetchUsers(value);
  };

  const onSubmit = async (data: CreateOfferFormData) => {
    setIsLoading(true);
    try {
      const res = await createOffer(data);
      if (res?.errors) {
        setError("Error creating offer");
        return;
      }
      reset();
      setError("");
      setSuccessMessage("The onboarding offer has been sent to the new user.");
      setIsSuccessModalOpen(true);
    } catch (error) {
      setError("Error creating offer");
      console.error("Error creating offer:", error);
    } finally {
      setIsLoading(false);
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
                    <Box style={{ marginTop: ".5rem" }}>
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
                                handleCheckboxChange(event, field, "on_demand")
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
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      options={userOptions}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      sx={{ marginTop: ".5rem" }}
                      loading={loadingUsers}
                      renderInput={(params) => (
                        <TextField
                          defaultValue={""}
                          placeholder='User Name'
                          {...params}
                          error={!!error}
                          onChange={(event) =>
                            handleSearchChange(event, event.target.value)
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        field.onChange(newValue ? newValue.id : "");
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
                        sx={{ width: "100%", marginTop: ".5rem" }}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          field.onChange(
                            newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                          );
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
                      style={{ marginTop: ".5rem" }}
                      fullWidth
                      type='number'
                      {...field}
                      placeholder='$ Price'
                      error={!!errors.price}
                      onChange={(event) => {
                        const parsedValue = parseFloat(event.target.value);
                        field.onChange(isNaN(parsedValue) ? "" : parsedValue);
                      }}
                    />
                  )}
                />
                {errors.price && (
                  <Typography color='error'>{errors.price.message}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid>
              {error !== "" && (
                <Typography variant='h6' component='sub' color='error'>
                  {error}
                </Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
        <Grid item xs={12} display='flex' justifyContent='end'>
          {" "}
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={isLoading}
            sx={{
              width: "120px",
              bgcolor: "#000",
              py: 1.5,
              px: 1,
              mt: 2,
              "&:hover": {
                bgcolor: "#333",
              },
              "&:focus-visible": {
                outline: "2px solid #000",
                outlineOffset: 2,
              },
            }}
            aria-label={isLoading ? "Sending..." : "Send offer"}
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

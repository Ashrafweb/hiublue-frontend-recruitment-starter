"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	TableSortLabel,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	Grid,
	InputAdornment,
	TablePagination,
	Typography,
	Skeleton,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ModeEdit, MoreVertOutlined } from "@mui/icons-material";
import MyChip from "@/theme/overrides/components/mychip";
import { DataItem, TableData } from "@/types";
import { columns } from "./data";
import { getOfferList } from "@/lib/apiClient";
import { StyledTab, StyledTabs } from "@/theme/overrides/components/styledTabs";
type OfferStatus = "accepted" | "pending" | "rejected" | "all";

const OfferListTable = () => {
	const [searchText, setSearchText] = useState("");
	const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [typeFilter, settypeFilter] = useState<DataItem["type"] | "">("");
	const [statusFilter, setStatusFilter] = useState<OfferStatus>("all");
	const [tableData, setTableData] = useState<TableData["data"]>([]);
	const [displayedData, setDisplayedData] = useState<TableData["data"]>([]);
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [rows, setRows] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getTableData();
				data && setTableData(data);
			} catch (error) {
				console.error("failed to fetch offer list");
			}
		};
		fetchData();
		setLoading(false);
	}, [page, rowsPerPage, statusFilter, typeFilter, searchText]);

	const getTableData = async () => {
		const queryParams = new URLSearchParams({
			page: (page + 1).toString(),
			per_page: rowsPerPage.toString(),
			search: searchText,
			type: typeFilter,
			status: statusFilter === "all" ? "" : statusFilter,
		});
		const query = queryParams.toString();
		const result = await getOfferList(query);
		setRows(result?.meta.total || 0);
		return result?.data;
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	};

	const handleSort = (columnId: keyof DataItem) => {
		if (sortColumn === columnId) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(columnId);
			setSortDirection("asc");
		}
	};

	const handletypeFilterChange = (
		event: SelectChangeEvent<DataItem["type"]>
	) => {
		settypeFilter(event.target.value as DataItem["type"]);
	};

	const handleStatusFilterChange = (
		event: React.SyntheticEvent,
		newValue: OfferStatus
	) => {
		setPage(0);
		setStatusFilter(newValue);
	};

	interface FilteredDataItem extends DataItem {
		[key: string]: any;
	}

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const filteredData: FilteredDataItem[] = (tableData || [])
		.filter((item: DataItem) => {
			const searchRegex = new RegExp(searchText, "i");
			return Object.values(item).some((value) =>
				searchRegex.test(String(value))
			);
		})
		.filter((item: DataItem) => {
			if (typeFilter === "") {
				return true;
			}
			return item.type === typeFilter;
		})
		.filter((item: DataItem) => {
			if (statusFilter === "all") return true;
			return item.status === statusFilter;
		});

	const sortedData = sortColumn
		? [...filteredData].sort((a, b) => {
				const aValue = a[sortColumn];
				const bValue = b[sortColumn];

				if (aValue < bValue) {
					return sortDirection === "asc" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortDirection === "asc" ? 1 : -1;
				}
				return 0;
		  })
		: filteredData;

	const renderSkeleton = () => (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column.id}>
								<Skeleton variant='text' width={100} animation='wave' />{" "}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{[...Array(rowsPerPage)].map(
						(
							_,
							index // Create skeleton rows
						) => (
							<TableRow key={index}>
								{columns.map((column) => (
									<TableCell key={column.id}>
										<Skeleton
											variant='rectangular'
											height={rowsPerPage}
											animation='wave'
										/>{" "}
									</TableCell>
								))}
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);

	return loading ? (
		renderSkeleton()
	) : (
		<Box
			padding={2}
			sx={{ width: "100%" }}
			boxShadow='0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)'
		>
			<Box>
				<Box>
					<Typography variant='h4' component='header'>
						Offer List
					</Typography>
				</Box>
				<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
					<StyledTabs
						value={statusFilter}
						onChange={handleStatusFilterChange}
						textColor='inherit'
					>
						<StyledTab label='All' value='all' />
						<StyledTab label='Accepted' value='accepted' />
						<StyledTab label='Pending' value='pending' />
						<StyledTab label='Rejected' value='rejected' />
					</StyledTabs>
				</Box>
				<Grid container spacing={2}>
					<Grid item md={6} sm={12} xs={12}>
						<TextField
							placeholder='Search...'
							variant='outlined'
							value={searchText}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchRoundedIcon />
									</InputAdornment>
								),
							}}
							onChange={handleSearchChange}
							sx={{ mb: 2, width: "100%" }}
						/>
					</Grid>
					<Grid item md={2} sm={12} xs={12}>
						<FormControl sx={{ mb: 2, width: "100%" }}>
							<InputLabel id='type-filter-label'>Type</InputLabel>
							<Select
								labelId='type-filter-label'
								id='type-filter'
								value={typeFilter}
								label='Type'
								onChange={handletypeFilterChange}
							>
								<MenuItem value=''>All</MenuItem>
								<MenuItem value='monthly'>Monthly</MenuItem>
								<MenuItem value='yearly'>Yearly</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id}>
									{column.id !== "action" ? (
										<TableSortLabel
											active={sortColumn === column.id}
											direction={
												sortColumn === column.id ? sortDirection : "asc"
											}
											onClick={() => handleSort(column.id as keyof DataItem)}
										>
											{column.label}
										</TableSortLabel>
									) : (
										column.label
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedData.map((row, index) => (
							<TableRow key={index}>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										sx={{ textTransform: "capitalize", fontWeight: 600 }}
									>
										{column.id === "status" ? (
											<MyChip
												label={row[column.id as keyof DataItem]}
												status={row.status}
											/>
										) : column.id === "action" ? (
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													gap: 2,
												}}
											>
												<ModeEdit />
												<MoreVertOutlined />
											</Box>
										) : (
											row[column.id as keyof DataItem]
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
						colSpan={3}
						count={rows || 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Box>
			</TableContainer>
		</Box>
	);
};

export default OfferListTable;
